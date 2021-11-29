---
recipe: api-interface
title: 'CanvasRenderingContext2D.textLetterSpacing'
mdn_url: /en-US/docs/Web/API/CanvasRenderingContext2D/textLetterSpacing
specifications: https://html.spec.whatwg.org/#dom-context-2d-textletterspacing
browser_compatibility: api.CanvasRenderingContext2D.textLetterSpacing
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing](https://developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing).**

## Description

The `letterSpacing` property of the `CanvasRenderingContext2D` interface
returns a double that represents horizontal spacing between characters. 
Setting `letterSpacing` to postive values spreads characters further apart, 
while negative values brings them closer together. The default value is 0.

## Syntax

`var letterSpacing = CanvasRenderingContext2D.letterSpacing`
`CanvasRenderingContext2D.letterSpacing = letterSpacing`

### Value

A String representing horizontal spacing behavior between characters.

### Example

This example demonstrates the various `letterSpacing` property values:

```js
const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
const letterSpacings = ['-2px', '0px', '4px', '1cm', '0.2em', '-0.5mm', '1in'];
ctx.font = '20px serif';

letterSpacings.forEach(function (letterSpacing, index) {
  ctx.letterSpacing = letterSpacing;
  const y = 50 + index * 50;
  ctx.fillText('Hello World (letterSpacing: ' + letterSpacing + ')', 20, y);
});
```

## See also
[CSS property letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
