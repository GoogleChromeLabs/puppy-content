---
recipe: api-interface
title: 'ScreenAdvanced'
mdn_url: /en-US/docs/Web/API/ScreenAdvanced
specifications: https://webscreens.github.io/window-placement/#screenadvanced
browser_compatibility: api.ScreenAdvanced
---

## Description

The `ScreenAdvanced` interface of the Window Placement API extends the
`Screen` interface and provides additional per-screen information.


## Constructor

None.

## Properties

**`ScreenAdvanced.left`**

Returns the distance in pixels to the left edge of the screen from the primary screen origin.

**`ScreenAdvanced.top`**

Returns the distance in pixels to the top edge of the screen from the primary screen origin.

**`ScreenAdvanced.isPrimary`**

Returns true if this screen is the primary screen.

**`ScreenAdvanced.isInternal`**

Returns true if this scren is built into the device, like a laptop display.

**`ScreenAdvanced.devicePixelRatio`**

Returns ratio of this screen's resolution in physical pixels to its resolution in CSS pixels.

**`ScreenAdvanced.id`**

Returns a temporary, generated per-origin unique ID; resets when cookies are deleted.

**`ScreenAdvanced.pointerTypes`**

Returns an array of `PointerType` strings.

## Examples

### Detailed information about the current screen

The following example shows how to query the browser for more
information about the current screen. If permission is granted, some
information about the screen will be logged. If permission is not
granted, a warning will be logged.

```js

window.getScreens().then(
  screens => {
    console.log("Permission was granted");

    console.log("ID: " + screens.currentScreen.id);
    console.log("Size: " + screens.currentScreen.width + " x " + screens.currentScreen.height);
    console.log("Position: " + screens.currentScreen.left + " x " + screens.currentScreen.top);
    console.log("Scale: " + screens.currentScreen.devicePixelRatio);
    console.log("Primary? " + screens.currentScreen.isPrimary);
    console.log("Internal? " + screens.currentScreen.isInternal);
    console.log("Touch? " + screens.currentScreen.pointerTypes.includes("touch"));
  },

  error => {
    console.warn("Permission was denied");
  }
);
```
### Detailed information about the all screens

The following example shows how to query the browser for more
information about all available screens. If permission is granted,
some information about each screen will be logged. If permission is
not granted, a warning will be logged.

```js

window.getScreens().then(
  screens => {
    console.log("Permission was granted");

    screens.screens.forEach(screen => {
      console.log("ID: " + screen.id);
      console.log("  Size: " + screen.width + " x " + screen.height);
      console.log("  Position: " + screen.left + " x " + screen.top);
      console.log("  Scale: " + screen.devicePixelRatio);
      console.log("  Primary? " + screen.isPrimary);
      console.log("  Internal? " + screen.isInternal);
      console.log("  Touch? " + screen.pointerTypes.includes("touch"));
    });
  },

  error => {
    console.warn("Permission was denied");
  }
);
```
