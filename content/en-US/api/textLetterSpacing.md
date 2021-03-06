---
recipe: api-interface
title: 'CanvasRenderingContext2D.textLetterSpacing'
mdn_url: /en-US/docs/Web/API/CanvasRenderingContext2D/textLetterSpacing
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.CanvasRenderingContext2D.textLetterSpacing
---


**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing](https://developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing).**

## Description

The `textLetterSpacing` property of the `CanvasRenderingContext2D` interface
returns a double which represents horizontal spacing behavior between text
characters. Setting `textLetterSpacing` to postive values causes characters to
spread farther apart, while negative value brings them closer together.
The default value is 0.

## Syntax

`var textLetterSpacing = CanvasRenderingContext2D.textLetterSpacing`
`CanvasRenderingContext2D.textLetterSpacing = textLetterSpacing`

### Value

A `double` representing horizontal spacing behavior between text characters.

### Example

This example demonstrates the various `TextLetterSpacing` property values.

```js
const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
const letterSpacings = [-3, 0, 3];
ctx.font = '36px serif';

letterSpacings.forEach(function (letterSpacing, index) {
  ctx.textLetterSpacing = letterSpacing;
  const y = 50 + index * 50;
  ctx.fillText('Hello World (textLetterSpacing: ' + letterSpacing + ')', 20, y);
});
```

