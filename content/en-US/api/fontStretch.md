---
recipe: api-interface
title: 'CanvasRenderingContext2D.fontStretch'
mdn_url: /en-US/docs/Web/API/CanvasRenderingContext2D/fontStretch
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.CanvasRenderingContext2D.fontStretch
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing](https://developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing).**

## Description

The `fontStretch` property of the `CanvasRenderingContext2D` interface
allows the developers to select different font-face from a font. The default
value is `normal`.

## Syntax

`CanvasRenderingContext2D.fontStretch = "ultra-condensed"`
`CanvasRenderingContext2D.fontStretch = "extra-condensed"` 
`CanvasRenderingContext2D.fontStretch = "condensed"`
`CanvasRenderingContext2D.fontStretch = "semi-condensed"` 
`CanvasRenderingContext2D.fontStretch = "normal"` 
`CanvasRenderingContext2D.fontStretch = "semi-expanded"`
`CanvasRenderingContext2D.fontStretch = "expanded"`
`CanvasRenderingContext2D.fontStretch = "extra-expanded"`
`CanvasRenderingContext2D.fontStretch = "ultra-expanded"`
`var fontStretch = CanvasRenderingContext2D.fontStretch`

### Value

A `string` representing current `fontStretch` value. The possible font-face values 
are `"ultra-condensed"`, `"extra-condensed"`, `"condensed"`, `"semi-condensed"`, 
`"normal"`, `"semi-expanded"`, `"expanded"`, `"extra-expanded"`, `"ultra-expanded"`.

## Example

This example demonstrates the various `fontStretch` property values.

```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set f1 to be the condensed font-face of font test.
var f1 = new FontFace('test', 'url(/path/to/font1)');
f1.stretch = "condensed";
document.fonts.add(f);
// Set f2 to be the normal font face of font text.
var f2 = new FontFace('test', 'url(/path/to/font2');
document.fonts.add(f2);

//Since fontStretch is set to condensed, text shouls be shown in the font-face f1.
document.fonts.ready.then(() => {
    ctx.font = '25px test';
    ctx.fontStretch = "condensed";
    ctx.fillText("text", 10, 40);
}
});

```

## See also
[CSS property font-stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch)
