/* global STICKER_SIZES, STICKER_PROMOTIONS, STICKER_CATALOG */
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

    globalThis.initStickerPage = function initStickerPage() {
        const catalogItems = document.getElementById('sticker-catalog');
        const selectedItems = document.getElementById('selected-stickers');
        const summary = document.getElementById('order-summary');
        const total = document.getElementById('order-total');
        const form = document.getElementById('sticker-order-form');
        if (!catalogItems || !selectedItems || !summary || !form) return;

        const chosen = new Map();
        const translate = key => typeof i18next !== 'undefined' ? i18next.t(key) : key;
        const sizeLabel = size => translate(`stickers_page.sizes.${size.id}`) || size.label;
        const moneyLabel = value => `$${value.toFixed(2)}`;

        function renderCatalog() {
            catalogItems.replaceChildren(...STICKER_CATALOG.map(item => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = `catalog-card rounded-xl border p-3 text-left transition ${chosen.has(item.id)
                    ? 'border-tone-gold ring-2 ring-tone-gold bg-tone-gold/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`;
                card.setAttribute('aria-pressed', chosen.has(item.id));
                card.dataset.id = item.id;
                const image = document.createElement('img');
                image.src = item.image;
                image.alt = item.alt;
                image.className = 'w-full aspect-square object-contain rounded-lg bg-gray-100 dark:bg-gray-900';
                const label = document.createElement('span');
                label.className = 'mt-2 block text-center font-semibold';
                label.textContent = translate(`stickers_page.catalog.${item.id}`) || item.label;
                card.append(image, label);
                card.addEventListener('click', () => {
                    if (chosen.has(item.id)) chosen.delete(item.id);
                    else chosen.set(item.id, STICKER_SIZES[2].id);
                    renderCatalog();
                    renderSelection();
                });
                return card;
            }));
        }

        function renderSelection() {
            selectedItems.replaceChildren(...[...chosen].map(([id, selectedSize]) => {
                const item = STICKER_CATALOG.find(entry => entry.id === id);
                const row = document.createElement('div');
                row.className = 'flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800 p-3';
                const label = document.createElement('span');
                label.className = 'font-medium flex-1';
                label.textContent = translate(`stickers_page.catalog.${id}`) || item.label;
                const select = document.createElement('select');
                select.className = 'rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2';
                select.setAttribute('aria-label', `${label.textContent} ${translate('stickers_page.size')}`);
                STICKER_SIZES.forEach(size => {
                    const option = document.createElement('option');
                    option.value = size.id;
                    option.textContent = `${sizeLabel(size)} (${size.area}) — ${moneyLabel(size.price)}`;
                    option.selected = size.id === selectedSize;
                    select.append(option);
                });
                select.addEventListener('change', event => {
                    chosen.set(id, event.target.value);
                    updateSummary();
                });
                row.append(label, select);
                return row;
            }));
            updateSummary();
        }

        function updateSummary() {
            const items = [...chosen].map(([id, size]) => ({ id, size }));
            const pricing = calculateOrder(items);
            summary.replaceChildren();
            if (!items.length) {
                const empty = document.createElement('p');
                empty.className = 'text-gray-500 dark:text-gray-400';
                empty.textContent = translate('stickers_page.empty');
                summary.append(empty);
            } else {
                const subtotal = document.createElement('p');
                subtotal.textContent = `${translate('stickers_page.subtotal')}: ${moneyLabel(pricing.subtotal)}`;
                summary.append(subtotal);
                pricing.promotions.forEach(promotion => {
                    const promo = document.createElement('p');
                    promo.className = 'text-tone-teal dark:text-tone-beige';
                    promo.textContent = `${translate('stickers_page.promotion')}: ${translate(`stickers_page.promotions.${promotion.id}`) || promotion.label}`;
                    summary.append(promo);
                });
            }
            if (total) total.textContent = moneyLabel(pricing.total);
        }

        form.addEventListener('submit', event => {
            event.preventDefault();
            const order = {
                name: form.elements.name.value,
                phone: form.elements.phone.value,
                stickers: [...chosen].map(([id, size]) => ({ id, size }))
            };
            const validation = validateOrder(order);
            const feedback = document.getElementById('order-feedback');
            if (!validation.valid) {
                feedback.textContent = translate('stickers_page.validation');
                feedback.className = 'text-sm text-red-600 dark:text-red-400';
                return;
            }
            feedback.textContent = '';
            const pricing = calculateOrder(order.stickers);
            const message = buildWhatsAppMessage(order.name.trim(), order.phone.trim(), order.stickers, pricing);
            window.open(`https://wa.me/50764530015?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
        });

        renderCatalog();
        renderSelection();
        const rerenderLanguage = () => {
            renderCatalog();
            renderSelection();
        };
        if (typeof i18next !== 'undefined' && i18next.on) i18next.on('languageChanged', rerenderLanguage);
    };
}
