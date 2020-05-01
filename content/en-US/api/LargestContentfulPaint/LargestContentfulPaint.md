---
recipe: api-feature
title: 'LargestContentfulPaint'
mdn_url: /en-US/docs/Web/API/LargestContentfulPaint
specifications: https://wicg.github.io/largest-contentful-paint/#sec-largest-contentful-paint-interface
browser_compatibility: api.[[APIName]]
---

## Description

The `LargestContentfulPaint` interface of the Largest Contentful Paint API provides details about the largest image or text paint before user input on a web page. The timing of this paint is a good heuristic for when the main page content is available during load.

## Properties

**`LargestContentfulPaint.element`**

The element that is the current largest contentful paint.

**`LargestContentfulPaint.renderTime`**

The time the element was rendered to the screen. May not be available if the element is a cross-origin image loaded without the `Timing-Allow-Origin` header.

**`LargestContentfulPaint.loadTime`**

The time the element was loaded.

**`LargestContentfulPaint.size`**

The size of the element (width * height).

**`LargestContentfulPaint.id`**

The id of the element.

**`LargestContentfulPaint.url`**

If the element is an image, the request url of the image.

## Methods

**`LargestContentfulPaint.toJSON()`**

Returns the above properties as JSON.

## Examples

The following example shows how to create a [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) that listens for `largest-contentful-paint` entries and logs the LCP value to the console.

```js
// Catch errors since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  // Create a variable to hold the latest LCP value (since it can change).
  let lcp;

  // Create the PerformanceObserver instance.
  const po = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];

    // Update `lcp` to the latest value, using `renderTime` if it's available,
    // otherwise using `loadTime`. (Note: `renderTime` may not be available if
    // the element is an image and it's loaded cross-origin without the
    // `Timing-Allow-Origin` header.)
    lcp = lastEntry.renderTime || lastEntry.loadTime;
  });

  // Observe entries of type `largest-contentful-paint`, including buffered
  // entries, i.e. entries that occurred before calling `observe()`.
  po.observe({type: 'largest-contentful-paint', buffered: true});

  // Send the latest LCP value to your analytics server once the user
  // leaves the tab.
  addEventListener('visibilitychange', function fn() {
    if (lcp && document.visibilityState === 'hidden') {
      console.log('LCP:', lcp);
      removeEventListener('visibilitychange', fn, true);
    }
  }, true);
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}
```
