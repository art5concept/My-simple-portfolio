const test = require('node:test');
const assert = require('node:assert/strict');
const {
    calculateOrder,
    buildWhatsAppMessage,
    validateOrder
} = require('./stickers.js');

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
