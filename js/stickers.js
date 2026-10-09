/* global STICKER_SIZES, STICKER_PROMOTIONS */
const catalog = typeof require === 'function'
    ? require('./sticker-catalog.js')
    : { STICKER_SIZES, STICKER_PROMOTIONS };

const sizeAliases = { xs: 'extra-small', extraSmall: 'extra-small', s: 'small', m: 'medium', l: 'large', extraLarge: 'extra-large', xl: 'extra-large' };
const cents = value => Math.round(value * 100);
const money = value => `$${value.toFixed(2)}`;

function calculateOrder(items, pricing = catalog) {
    const sizes = pricing.STICKER_SIZES;
    const promotions = pricing.STICKER_PROMOTIONS;
    const sizeById = new Map(sizes.map(size => [size.id, size]));
    const normalized = items.map(item => {
        const sizeId = sizeAliases[item.size] || item.size;
        const size = sizeById.get(sizeId);
        if (!size) throw new Error(`Unknown sticker size: ${item.size}`);
        return { ...item, size: size.id, sizeLabel: size.label, unitPrice: size.price };
    });
    const counts = Object.fromEntries(sizes.map(size => [size.id, 0]));
    normalized.forEach(item => { counts[item.size] += 1; });
    const keys = sizes.map(size => size.id);
    const individual = normalized.reduce((sum, item) => sum + cents(item.unitPrice), 0);
    const memo = new Map();
    function best(state) {
        const key = state.join(',');
        if (memo.has(key)) return memo.get(key);
        const first = state.findIndex(value => value > 0);
        if (first === -1) return { cost: 0, uses: [] };
        const next = state.slice();
        next[first] -= 1;
        let result = best(next);
        result = { cost: result.cost + cents(sizes[first].price), uses: result.uses };
        promotions.forEach(promotion => {
            const requirements = keys.map(size => promotion.requirements[size] || 0);
            if (requirements.every((amount, index) => amount <= state[index])) {
                const remainder = state.map((amount, index) => amount - requirements[index]);
                const candidate = best(remainder);
                const uses = [{ ...promotion }, ...candidate.uses];
                const option = { cost: candidate.cost + cents(promotion.price), uses };
                if (option.cost < result.cost || (option.cost === result.cost && uses.map(use => use.id).join(',') < result.uses.map(use => use.id).join(','))) result = option;
            }
        });
        memo.set(key, result);
        return result;
    }
    const optimized = best(keys.map(key => counts[key]));
    const promotionCounts = new Map();
    optimized.uses.forEach(promotion => promotionCounts.set(promotion.id, (promotionCounts.get(promotion.id) || 0) + 1));
    return {
        items: normalized,
        subtotal: individual / 100,
        promotions: promotions
            .filter(promotion => promotionCounts.has(promotion.id))
            .map(promotion => ({ ...promotion, quantity: promotionCounts.get(promotion.id) })),
        total: optimized.cost / 100
    };
}

function buildWhatsAppMessage(name, phone, items, pricing) {
    if (!pricing && items.every(item => typeof item === 'string')) {
        return `Hola, soy ${name}. Mi número de teléfono es ${phone}. Quiero los stickers: ${items.join(', ')}.`;
    }
    const result = pricing && pricing.total !== undefined ? pricing : calculateOrder(items);
    const itemLines = result.items
        ? result.items.map(item => `${item.id}: ${item.sizeLabel} (${money(item.unitPrice)})`).join(', ')
        : items.join(', ');
    const promotions = result.promotions.map(promotion => `${promotion.quantity > 1 ? `${promotion.quantity} × ` : ''}${promotion.label}`).join('; ') || 'Ninguna';
    return `Hola, soy ${name}. Mi número de teléfono es ${phone}. Quiero los stickers: ${itemLines}. Promociones: ${promotions}. Total: ${money(result.total)}.`;
}

function validateOrder(order) {
    if (!order.name.trim() || !order.phone.trim() || order.stickers.length === 0) {
        return { valid: false, message: 'Completa tu nombre, teléfono y selecciona al menos un sticker.' };
    }
    return { valid: true };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateOrder, buildWhatsAppMessage, validateOrder };
} else {
    Object.assign(globalThis, { calculateOrder, buildWhatsAppMessage, validateOrder });
}
