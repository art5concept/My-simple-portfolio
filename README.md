# My Simple Portfolio

Este es un repositorio que contendra mi portafolio personal

## Mantener el catálogo de stickers

Para agregar un diseño, guarda la imagen en `images/stickers/` (por ejemplo,
`images/stickers/sticker-07.svg`) y añade una entrada a `STICKER_CATALOG` en
`js/sticker-catalog.js` con esta forma:

```js
Object.freeze({
    id: '07',
    image: 'images/stickers/sticker-07.svg',
    alt: 'Sticker 07',
    label: '#07'
})
```

Usa un `id` único, conserva la ruta relativa `images/stickers/<archivo>` y
actualiza las traducciones del catálogo si el diseño necesita un nombre
visible distinto de `label`.