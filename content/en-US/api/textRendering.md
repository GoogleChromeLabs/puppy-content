---
recipe: api-interface
title: 'CanvasRenderingContext2D.textRendering'
mdn_url: /en-US/docs/Web/API/CanvasRenderingContext2D/textRendering
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.CanvasRenderingContext2D.textRendering
---


**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textRendering](https://developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textRendering).**

## Description

The `textRendering` property of `CanvasRenderingContext2D` provides information
to the rendering engine about what to optimize for when rendering text.

The default value is `auto`, where the browser makes trade-offs among speed, 
legibility, and geometric precision.

## Syntax

`CanvasRenderingContext2D.textRendering = "auto" || "optimizeSpeed" || "optimizeLegibility" || "geometricPrecision"`
`var textRendering = CanvasRenderingContext2D.textRendering`

### Value
A `string` representing current `textRendering` value. The possible values are:

#### Options
`"auto"`
The browser makes educated guesses about when to optimize for speed, legibility, 
and geometric precision while drawing text. 

`"optimizeSpeed"`
The browser emphasizes rendering speed over legibility and geometric precision 
when drawing text. It disables kerning and ligatures.

`"optimizeLegibility"`
The browser emphasizes legibility over rendering speed and geometric precision.
This enables kerning and optional ligatures.

`"geometricPrecision"`
The browser emphasizes geometric precision over rendering speed and legibility. 
Certain aspects of fonts, don't scale linearly(ex: Kerning). Geometric Precision 
can make text using those fonts look good.

Another usage of `geometricPrecision`is that it allows user to scale text
fluidly, it understands float value for font size.

### Example

This example demonstrates the various `textRendering` property values.

#### optimizespeed vs optimizelegibility
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.font = '20px serif';
ctx.textRendering = "optimizespeed";
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 50);

ctx.textRendering = "optimizelegibility";
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 100);
```

#### optimizespeed vs geometricPrecision
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.font = '20px serif';
ctx.textRendering = "optimizespeed";
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 50);

ctx.textRendering = "geometricPrecision";
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 100);
```

#### geometricPrecision
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.font = '30px serif';
ctx.textRendering = "geometricPrecision";
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 50);
ctx.font = '29.5px serif';
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 100);
ctx.font = '29px serif';
ctx.fillText('LYoWAT - ff fi fl ffl', 20, 150);az
```

## See also
[CSS property text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering)
