const test = require('node:test');
const assert = require('node:assert/strict');
const {
    calculateOrder,
    buildWhatsAppMessage,
    validateOrder
} = require('./stickers.js');
const { STICKER_PROMOTIONS } = require('./sticker-catalog.js');

test('keeps nested promotion requirements immutable', () => {
    const promotion = STICKER_PROMOTIONS[0];

    assert.equal(Object.isFrozen(promotion), true);
    assert.equal(Object.isFrozen(promotion.requirements), true);
    assert.equal(Reflect.set(promotion.requirements, 'extra-small', 99), false);
    assert.equal(promotion.requirements['extra-small'], 3);
});

test('calculates individual size prices', () => {
    const result = calculateOrder([
        { id: '01', size: 'extra-small' },
        { id: '02', size: 'small' },
        { id: '03', size: 'medium' },
        { id: '04', size: 'large' },
        { id: '05', size: 'extra-large' }
    ]);

    assert.equal(result.subtotal, 5.45);
    assert.equal(result.total, 5.45);
    assert.deepEqual(result.promotions, []);
});

test('applies each size promotion when its quantity threshold is met', () => {
    assert.equal(calculateOrder([
        { id: '01', size: 'extra-small' },
        { id: '02', size: 'extra-small' },
        { id: '03', size: 'extra-small' }
    ]).total, 1);
    assert.equal(calculateOrder([
        { id: '01', size: 'small' },
        { id: '02', size: 'small' },
        { id: '03', size: 'small' },
        { id: '04', size: 'small' },
        { id: '05', size: 'small' }
    ]).total, 2.5);
    assert.equal(calculateOrder([
        { id: '01', size: 'medium' },
        { id: '02', size: 'medium' },
        { id: '03', size: 'medium' }
    ]).total, 2.5);
    assert.equal(calculateOrder([
        { id: '01', size: 'small' },
        { id: '02', size: 'small' },
        { id: '03', size: 'medium' },
        { id: '04', size: 'medium' },
        { id: '05', size: 'large' }
    ]).total, 4.5);
});

test('reports all four promotion summaries in pricing and WhatsApp output', () => {
    const cases = [
        [['extra-small', 'extra-small', 'extra-small'], 'extra-small-3', '3 extra pequeños por $1.00'],
        [['small', 'small', 'small', 'small', 'small'], 'small-5', '5 pequeños por $2.50'],
        [['medium', 'medium', 'medium'], 'medium-3', '3 medianos por $2.50'],
        [['small', 'small', 'medium', 'medium', 'large'], 'mixed-5', 'Combo surtido: 2 pequeños + 2 medianos + 1 grande por $4.50']
    ];

    cases.forEach(([sizes, id, label]) => {
        const items = sizes.map((size, index) => ({ id: String(index + 1), size }));
        const pricing = calculateOrder(items);
        const message = buildWhatsAppMessage('Ana', '61234567', items, pricing);
        assert.deepEqual(pricing.promotions.map(({ id: promotionId }) => promotionId), [id]);
        assert.match(message, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
});

test('chooses the cheapest valid combination of promotions', () => {
    const result = calculateOrder([
        { id: '01', size: 'small' },
        { id: '02', size: 'small' },
        { id: '03', size: 'small' },
        { id: '04', size: 'small' },
        { id: '05', size: 'small' },
        { id: '05', size: 'medium' },
        { id: '06', size: 'medium' },
        { id: '07', size: 'medium' }
    ]);

    assert.equal(result.total, 5);
    assert.deepEqual(result.promotions.map(({ id }) => id), ['small-5', 'medium-3']);
});

test('builds a WhatsApp message with the customer data and selected sticker numbers', () => {
    assert.equal(
        buildWhatsAppMessage('Ana', '61234567', ['01', '04']),
        'Hola, soy Ana. Mi número de teléfono es 61234567. Quiero los stickers: 01, 04.'
    );
});

test('includes size, unit price, promotion, and total in the WhatsApp message', () => {
    const items = [
        { id: '01', size: 'small' },
        { id: '02', size: 'small' },
        { id: '03', size: 'small' },
        { id: '04', size: 'small' },
        { id: '05', size: 'small' }
    ];
    const pricing = calculateOrder(items);
    const message = buildWhatsAppMessage('Ana', '61234567', items, pricing);

    assert.match(message, /Pequeño/);
    assert.match(message, /\$0\.60/);
    assert.match(message, /5 pequeños por \$2\.50/);
    assert.match(message, /Total: \$2\.50/);
});

test('rejects an order without customer data or stickers', () => {
    assert.deepEqual(validateOrder({ name: '', phone: '', stickers: [] }), {
        valid: false,
        message: 'Completa tu nombre, teléfono y selecciona al menos un sticker.'
    });
});
