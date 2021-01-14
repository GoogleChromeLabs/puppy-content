---
recipe: api-interface
title: 'Serial'
mdn_url: /en-US/docs/Web/API/Serial
specifications: https://wicg.github.io/serial/#serial-interface
browser_compatibility: api.Serial
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API).**

## Description

The `Serial` interface of the Web Serial API provides attributes and methods for
finding and connecting to serial ports from a web page.

This interface requires a secure context.

## Constructor

None.

## Events

**`Serial.onconnect`**

Called when the port has been connected to the device. This event is only fired
for ports associated with removable devices such as those connected via USB. The
target of this event is the `SerialPort` interface that has been added. The user
must grant the origin permission to access this device during a call to
`requestDevice()` before this event will be fired.

**`Serial.ondisconnect`**

Called when the port has been connected to the device. This event is only fired
for ports associated with removable devices such as those connected via USB. The
target of this event is the `SerialPort` interface that has been removed. The
user must grant the origin permission to access this device during a call to
`requestDevice()` before this event will be fired.

## Methods

**`Serial.requestPort()`**

Returns a `Promise` that resolves with an instance of `SerialPort` representing
the device chosen by the user or rejects if no device was selected.

This method must be called with user activation.

**`Serial.getPorts()`**

Returns a `Promise` that resolves with an array of `SerialPort` objects
representing serial ports connected to the host which the origin has permission
to access.

## Examples

The following example shows how a site can check for available ports on load and
allow the user to grant it permission to access more.

```js
// Register event listeners for ports being connected or disconnected.
navigator.serial.addEventListener('connect', (e) => {
  // Connect to `e.target` or add it to a list of available ports.
});
navigator.serial.addEventListener('disconnect', (e) => {
  // Remove `e.target` from the list of available ports.
});

navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});

// Requesting access to a new port requires a user gesture. React to a button
// click. 
button.addEventListener('click', () => {
  // In this example the set of ports the user can choose from should be
  // filtered to only include USB devices with a particular vendor ID.
  const usbVendorId = ...;
  navigator.serial.requestPort({ filters: [{ usbVendorId }]}).then((port) => {
    // Connect to `port` or add it to the list of available ports.
  }).catch((e) => {
    // The user didn't select a port.
  });
});
```
