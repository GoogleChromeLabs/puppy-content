---
recipe: api-method
title: 'getScreens'
mdn_url: /en-US/docs/Web/API/Window/getScreens
specifications: https://webscreens.github.io/window-placement/#dom-window-getscreens
browser_compatibility: api.Window.getScreens
---

## Description

The `getScreens()` method of the `Window` interface returns information about each connected screen. The method may prompt the user for permission.

## Syntax

`Window.getScreens().then(...)`

### Parameters

None.

### Return value

Returns a {{jsxref('Promise')}} that resolves with a sequence of ScreenInfo objects.

Each ScreenInfo object has the following properties:

<dl>
  <dt>`availWidth`
  <dd>The width of the web-exposed available screen area.
  <dt>`availHeight`
  <dd>The height of the web-exposed available screen area.
  <dt>`width`
  <dd>The width of the web-exposed screen area.
  <dt>`height`
  <dd>The height of the web-exposed screen area.
  <dt>`colorDepth`
  <dt>`pixelDepth`
  <dd>The number of bits allocated to colors for a pixel in the output device, excluding the alpha channel. The `colorDepth` and `pixelDepth` values are the same, for compatibility reasons.

  <dt>`orientationType`
  <dd>One of "portrait-primary",  "portrait-secondary",  "landscape-primary",  "landscape-secondary".
  <dt>`orientationAngle`
  <dd>The angle in degrees.

  <dt>`left`
  <dd>Left edge of the screen area, e.g. 1920 (for a screen to the right of the primary)
  <dt>`top`
  <dd>Top edge of the screen area, e.g. 0 (for a screen with top aligned with the primary)
  <dt>`availLeft`
  <dd>Left edge of the available screen area, e.g. 1920
  <dt>`availTop`
  <dd>Top edge of the available screen area, e.g. 0

  <dt>`isPrimary`
  <dd>True if this is the primary display.
  <dt>`internal`
  <dd>True if this is an internal or built-in display.
  <dt>`scaleFactor`
  <dd>The difference between logical and physical pixels, like devicePixelRatio.
  <dt>`id`
  <dd>A temporary, generated per-origin unique ID; resets when cookies are deleted. Useful for persisting user window placements preferences for certain screens.
  <dt>`touchSupport`
  <dd>True if the screen supports touch input.
</dl>

## Examples

### Enumerating screen information

The following example shows how to query the browser for information about
every connected screen. If permission is granted to enumerate the screens,
some information about the screen will be logged. If permission is not
granted, a warning will be logged.


```js

window.getScreens().then(
  screens => {
    console.log("Screen enumeration permission was granted");

    screens.forEach(screen => {
      console.log("Screen ID: " + screen.id);
      console.log("  primary?  " + screen.isPrimary);
      console.log("  internal? " + screen.internal);
      console.log("  touch?    " + screen.touchSupport);
      console.log("  size:     " + screen.width + " x " + screen.height);
      console.log("  position: " + screen.left + " x " + screen.top);
    });
  },

  error => {
    console.warn("Screen enumeration permission was not granted");
  }
);
```
