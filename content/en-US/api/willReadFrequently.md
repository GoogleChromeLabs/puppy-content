---
recipe: api-interface
title: 'ContextAttributes.willReadFrequently'
mdn_url: /en-US/docs/Web/API/ContextAttributes/willReadFrequently
specifications: https://html.spec.whatwg.org/multipage/canvas.html#dom-canvasrenderingcontext2dsettings-willreadfrequently
browser_compatibility: api.ContextAttributes.willReadFrequently
---

## Description

The `willReadFrequently` property of the `ContextAttributes` interface returns a boolean
that indicates if the `CanvasRenderingContext2D` will be read frequently and the user agent
needs to optimize readback with `getImageData()`. 

On most devices, the user agent needs to decide whether to store the canvas's bitmap on the GPU or
on the CPU. Rendering operations are more performant for accelerated canvases (on the GPU)
except when doing readback with `getImageData()`, which is better on software canvas (on the
CPU). So if the webpage is likely to perform many readback operations, it's more advantageous
to set it to true; otherwise, set it to false.


## Syntax

`HTMLCanvasElement.getContext('2d', {willReadFrequently : true})`
`CanvasRenderingContext2D.getContextAttributes().willReadFrequently`

### Value

A boolean value which indicates whether the `CanvasRenderingContext2D` object is marked for readback
optimization.

## Examples

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// By default, willReadFrequently is set to false.
log(ctx.getContextAttributes().willReadFrequently) // output: false

const canvas2 = document.createElement('canvas');
const ctx2 = canvas2.getContext('2d', {willReadFrequently:true});
log(ctx.getContextAttributes().willReadFrequently) // output: true
```
