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

The `contextRestored` event is a javascript event that is triggered when the user agent
detects that the context associated with 'CanvasRenderingContext2D' on the page is "restored"
after being "lost".

Once the context is restored, the resources such as drawings that were created before
the context was lost are no longer valid. You need to reinitialize the state of your 
context and recreate resources.

## Examples

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('contextrestored', (event) => {
  console.log(event);
});

// If this context ctx is lost, this context will then be restored automatically. 
// The event "contextRestored" will be logged in the console.

## See also
[webglcontextlost event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event)
