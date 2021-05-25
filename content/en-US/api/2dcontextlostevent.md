---
recipe: api-interface
title: '2dcontextlost'
mdn_url: /en-US/docs/Web/API/2dcontextlost_event
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.2dcontextlost
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API).**

## Description

The 2d Rendering context losses may be intended by the user agent (to resolve
resource contention), or may be forced by external factors (e.g. a graphics
driver reset). In both scenarios, this event will be triggered after the 
2dRenderingContext has been lost. 

## Examples

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('contextlost', (event) => {
  console.log(event);
});

// Chrome allows users to force canvas context to be lost.
window.internals.forceLoseCanvasContext(canvas, "2d");

// After this rendering context 'ctx' is lost, "contextlost" is logged.

## See also
[webglcontextlost event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event)
