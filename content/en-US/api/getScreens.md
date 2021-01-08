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
