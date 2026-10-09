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
    Object.freeze({ id: '01', image: 'images/stickers/sticker-01.jpeg', alt: 'Sticker 01', label: '#01' }),
    Object.freeze({ id: '02', image: 'images/stickers/sticker-02.jpeg', alt: 'Sticker 02', label: '#02' }),
    Object.freeze({ id: '03', image: 'images/stickers/sticker-03.jpeg', alt: 'Sticker 03', label: '#03' }),
    Object.freeze({ id: '04', image: 'images/stickers/sticker-04.jpeg', alt: 'Sticker 04', label: '#04' }),
    Object.freeze({ id: '05', image: 'images/stickers/sticker-05.jpeg', alt: 'Sticker 05', label: '#05' }),
    Object.freeze({ id: '06', image: 'images/stickers/sticker-06.jpeg', alt: 'Sticker 06', label: '#06' }),
    Object.freeze({ id: '07', image: 'images/stickers/sticker-07.jpeg', alt: 'Sticker 07', label: '#07' }),
    Object.freeze({ id: '08', image: 'images/stickers/sticker-08.jpeg', alt: 'Sticker 08', label: '#08' }),
    Object.freeze({ id: '09', image: 'images/stickers/sticker-09.jpeg', alt: 'Sticker 09', label: '#09' }),
    Object.freeze({ id: '10', image: 'images/stickers/sticker-10.jpeg', alt: 'Sticker 10', label: '#10' }),
    Object.freeze({ id: '11', image: 'images/stickers/sticker-11.jpeg', alt: 'Sticker 11', label: '#11' }),
    Object.freeze({ id: '12', image: 'images/stickers/sticker-12.jpeg', alt: 'Sticker 12', label: '#12' }),
    Object.freeze({ id: '13', image: 'images/stickers/sticker-13.jpeg', alt: 'Sticker 13', label: '#13' }),
    Object.freeze({ id: '14', image: 'images/stickers/sticker-14.jpeg', alt: 'Sticker 14', label: '#14' }),
    Object.freeze({ id: '15', image: 'images/stickers/sticker-15.jpeg', alt: 'Sticker 15', label: '#15' }),
    Object.freeze({ id: '16', image: 'images/stickers/sticker-16.jpeg', alt: 'Sticker 16', label: '#16' }),
    Object.freeze({ id: '17', image: 'images/stickers/sticker-17.jpeg', alt: 'Sticker 17', label: '#17' }),
    Object.freeze({ id: '18', image: 'images/stickers/sticker-18.jpeg', alt: 'Sticker 18', label: '#18' }),
    Object.freeze({ id: '19', image: 'images/stickers/sticker-19.jpeg', alt: 'Sticker 19', label: '#19' }),
    Object.freeze({ id: '20', image: 'images/stickers/sticker-20.jpeg', alt: 'Sticker 20', label: '#20' }),
    Object.freeze({ id: '21', image: 'images/stickers/sticker-21.jpeg', alt: 'Sticker 21', label: '#21' }),
    Object.freeze({ id: '22', image: 'images/stickers/sticker-22.jpeg', alt: 'Sticker 22', label: '#22' }),
    Object.freeze({ id: '23', image: 'images/stickers/sticker-23.jpeg', alt: 'Sticker 23', label: '#23' }),
    Object.freeze({ id: '24', image: 'images/stickers/sticker-24.jpeg', alt: 'Sticker 24', label: '#24' }),
    Object.freeze({ id: '25', image: 'images/stickers/sticker-25.jpeg', alt: 'Sticker 25', label: '#25' }),
    Object.freeze({ id: '26', image: 'images/stickers/sticker-26.jpeg', alt: 'Sticker 26', label: '#26' }),
    Object.freeze({ id: '27', image: 'images/stickers/sticker-27.jpeg', alt: 'Sticker 27', label: '#27' }),
    Object.freeze({ id: '28', image: 'images/stickers/sticker-28.jpeg', alt: 'Sticker 28', label: '#28' }),
    Object.freeze({ id: '29', image: 'images/stickers/sticker-29.jpeg', alt: 'Sticker 29', label: '#29' }),
    Object.freeze({ id: '30', image: 'images/stickers/sticker-30.jpeg', alt: 'Sticker 30', label: '#30' }),
    Object.freeze({ id: '31', image: 'images/stickers/sticker-31.jpeg', alt: 'Sticker 31', label: '#31' }),
    Object.freeze({ id: '32', image: 'images/stickers/sticker-32.jpeg', alt: 'Sticker 32', label: '#32' }),
    Object.freeze({ id: '33', image: 'images/stickers/sticker-33.jpeg', alt: 'Sticker 33', label: '#33' }),
    Object.freeze({ id: '34', image: 'images/stickers/sticker-34.jpeg', alt: 'Sticker 34', label: '#34' }),
    Object.freeze({ id: '35', image: 'images/stickers/sticker-35.jpeg', alt: 'Sticker 35', label: '#35' }),
    Object.freeze({ id: '36', image: 'images/stickers/sticker-36.jpeg', alt: 'Sticker 36', label: '#36' }),
    Object.freeze({ id: '37', image: 'images/stickers/sticker-37.jpeg', alt: 'Sticker 37', label: '#37' }),
    Object.freeze({ id: '38', image: 'images/stickers/sticker-38.jpeg', alt: 'Sticker 38', label: '#38' })
]);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STICKER_SIZES, STICKER_PROMOTIONS, STICKER_CATALOG };
}
