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

Returns a {{jsxref('Promise')}} that resolves with a `Screens` object.

## Examples

### Logging the number of connected screens

The following example shows how to count the number of connected screens,
or log a warning if the permission is denied.

```js
window.getScreens().then(
  screens => {
    console.log("Screens: " + screens.screens.length);
  },
  error => {
    console.warn("Permission denied");
  }
);
```
