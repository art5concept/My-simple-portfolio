# Catálogo de stickers con pedidos por WhatsApp

## Objetivo

Convertir el selector de stickers embebido en `blog.html` en una entrada independiente `stickers.html`, editable mediante archivos del proyecto y capaz de calcular precios por tamaño y promociones.

## Alcance

- `blog.html` mostrará una tarjeta que enlaza a `stickers.html`.
- `stickers.html` mostrará el catálogo público y el formulario de pedido.
- Las imágenes públicas vivirán en `images/stickers/`.
- El catálogo se definirá en un archivo JavaScript para agregar stickers sin duplicar la lógica de la página.
- No habrá backend ni carga persistente desde el navegador.
- El pedido se abrirá en WhatsApp al número `50764530015`.

## Tamaños y precios

| Tamaño | Área orientativa | Precio |
| --- | --- | ---: |
| Extra pequeño | 2–3 in² | $0.35 |
| Pequeño | 5–8 in² | $0.60 |
| Mediano | 10–15 in² | $1.00 |
| Grande | 16–24 in² | $1.50 |
| Extra grande | 25–40 in² | $2.00 |

El área se muestra como referencia; el cliente selecciona el tamaño y el sistema usa el precio configurado.

## Promociones

- 3 extra pequeños por $1.00.
- 5 pequeños por $2.50.
- 3 medianos por $2.50.
- Combo surtido: 2 pequeños + 2 medianos + 1 grande por $4.50.

El cálculo comparará el precio individual con las promociones aplicables y usará la alternativa más económica sin combinar unidades de una misma categoría dos veces. El resumen indicará las promociones aplicadas.

## Flujo

1. El visitante abre `stickers.html` desde la tarjeta del blog.
2. Selecciona stickers y un tamaño para cada unidad.
3. La página recalcula subtotales, promociones y total.
4. El visitante introduce nombre y teléfono.
5. El sitio valida que exista al menos un sticker y que los datos no estén vacíos.
6. Se abre WhatsApp con el detalle del pedido y el total.

## Mantenimiento

Para agregar un diseño, se coloca una imagen en `images/stickers/` y se añade una entrada a `js/sticker-catalog.js` con `id`, `image`, `alt` y `label`.
