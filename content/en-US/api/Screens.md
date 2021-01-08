---
recipe: api-interface
title: 'Screens'
mdn_url: /en-US/docs/Web/API/Screens
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.Screens
---

## Description


The `Screens` interface of the Window Placement API provides multi-screen information and change events.

## Constructor

None.

## Properties

**`Screens.screens`**

Returns an array of `ScreenAdvanced` objects, which describe each connected screen.

**`Screens.currentScreen`**

Returns a `ScreenAdvanced` object for the current screen.

## Eventhandlers

**`Screens.onchange`**

Called when `screens` or `currentScreen` changes.

## Examples

### Logging the number of connected screens

The following example shows how to count the number of connected screens,
or log a warning if the permission is denied. The `getScreens()` call
may show a permission prompt if necessary.

```js
if (screen.isExtended) {
  window.getScreens().then(
    screens => {
      console.log("Screens: " + screens.screens.length);
    },
    error => {
      console.warn("Permission denied");
    }
  );
}
```

### Detecting when screen properties change

The following example logs a message if properties of the current
screen or the set of available screens changes. This example
assumes the permission was granted.

```js
window.getScreens().then(
  screens => {
    screens.onchange = event => {
      console.log("screens changed");
    };
  }
);
```
