---
recipe: api-interface
title: '2dcontextrestored'
mdn_url: /en-US/docs/Web/API/2dcontextrestored_event
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.2dcontextlost
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API).**

## Description

The 2d Rendering context losses may be intended by the user agent (to resolve
resource contention), or may be forced by external factors (e.g. a graphics
driver reset). If the context is lost then restored, this event will be triggered.  

Once the context is restored, the resources such as drawings that were created before
the context was lost are no longer valid. You need to reinitialize the state of your 
context and recreate resources.

## Examples

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('contextrestored', (event) => {
  console.log(event);
});

// Chrome allows users to force canvas context to be lost.
window.internals.forceLoseCanvasContext(canvas, "2d");

// After this rendering context 'ctx' is lost, 'ctx' will be restored automatically.
// "contextrestored" is logged.

## See also
[webglcontextlost event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event)
