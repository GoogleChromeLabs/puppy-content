---
recipe: api-method
title: 'isMultiScreen'
mdn_url: /en-US/docs/Web/API/Window/isMultiScreen
specifications: https://webscreens.github.io/window-placement/#dom-window-ismultiscreen
browser_compatibility: api.Window.isMultiScreen
---

## Description

The `isMultiScreen()` method of the `Window` interface returns whether the device has multiple connected screens on success. User agents can prompt for permission.

## Syntax

`Window.isMultiScreen().then(...)`

### Parameters

None.

### Return value

Returns a {{jsxref('Promise')}} that resolves with boolean.

## Examples

### Checking for multiple screens

The following example shows how to only query for screens if the system
has multiple screens, to avoid showing a permission prompt if the system
only has one.

```js
// Check to see if the system has multiple displays, and only
// enumerate them if there is more than one.

window.isMultiScreen().then(result => {

  if (!result) {

    // Only one display, don't enumerate.
    return;

  } else {

    // Multiple screens - try to enumerate them,
    // which may prompt the user for permission.

    window.getScreens().then(screens => {
      // ...
    });

  }

});

```
