function deepFreeze(value) {
    Object.freeze(value);
    Object.values(value).forEach(child => {
        if (child && typeof child === 'object' && !Object.isFrozen(child)) deepFreeze(child);
    });
    return value;
}

const STICKER_SIZES = deepFreeze([
    Object.freeze({ id: 'extra-small', label: 'Extra pequeño', area: '2–3 in²', price: 0.35 }),
    Object.freeze({ id: 'small', label: 'Pequeño', area: '5–8 in²', price: 0.60 }),
    Object.freeze({ id: 'medium', label: 'Mediano', area: '10–15 in²', price: 1.00 }),
    Object.freeze({ id: 'large', label: 'Grande', area: '16–24 in²', price: 1.50 }),
    Object.freeze({ id: 'extra-large', label: 'Extra grande', area: '25–40 in²', price: 2.00 })
]);

const STICKER_PROMOTIONS = deepFreeze([
    { id: 'extra-small-3', label: '3 extra pequeños por $1.00', requirements: { 'extra-small': 3 }, price: 1.00 },
    { id: 'small-5', label: '5 pequeños por $2.50', requirements: { small: 5 }, price: 2.50 },
    { id: 'medium-3', label: '3 medianos por $2.50', requirements: { medium: 3 }, price: 2.50 },
    { id: 'mixed-5', label: 'Combo surtido: 2 pequeños + 2 medianos + 1 grande por $4.50', requirements: { small: 2, medium: 2, large: 1 }, price: 4.50 }
]);

const STICKER_CATALOG = deepFreeze([
    Object.freeze({ id: '01', image: 'images/stickers/sticker-01.svg', alt: 'Sticker 01', label: '#01' }),
    Object.freeze({ id: '02', image: 'images/stickers/sticker-02.svg', alt: 'Sticker 02', label: '#02' }),
    Object.freeze({ id: '03', image: 'images/stickers/sticker-03.svg', alt: 'Sticker 03', label: '#03' }),
    Object.freeze({ id: '04', image: 'images/stickers/sticker-04.svg', alt: 'Sticker 04', label: '#04' }),
    Object.freeze({ id: '05', image: 'images/stickers/sticker-05.svg', alt: 'Sticker 05', label: '#05' }),
    Object.freeze({ id: '06', image: 'images/stickers/sticker-06.svg', alt: 'Sticker 06', label: '#06' })
]);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STICKER_SIZES, STICKER_PROMOTIONS, STICKER_CATALOG };
}
