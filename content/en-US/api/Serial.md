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

Called when the port has been connected to the device. This method receives an
`Event` object. This event is only fired for ports associated with removable
devices such as those connected via USB. The target of this event is the
`SerialPort` interface that has been connected. The user must grant the origin
permission to access this device during a call to `requestDevice()` before this
event will be fired.

**`Serial.ondisconnect`**

Called when the port has been disconnected from the device. This method receives
an `Event` object. This event is only fired for ports associated with removable
devices such as those connected via USB. The target of this event is the
`SerialPort` interface that has been disconnected. The user must grant the
origin permission to access this device during a call to `requestDevice()`
before this event will be fired.

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

The following example shows how a site can check for available ports and allow
the user to grant it permission to access more.

On load event listeners are added for the `connect` and `disconnect` events so
that the site can react when a device is connected or disconnected from the
system. The `getPorts()` method is then called to see what ports are connected
that the site already has access to.

If the site doesn't have access to any connected ports it has to wait until it
has user activation to proceed. In this example that is done using a `click`
event handler on a button. A filter is passed to `requestPort()` with a USB
vendor ID in order to limit the set of devices shown to the user to only USB
devices built by a particular manufacturer. The filter can be omitted to allow
the user to select any available port.

```js
navigator.serial.addEventListener('connect', (e) => {
  // Connect to `e.target` or add it to a list of available ports.
});
navigator.serial.addEventListener('disconnect', (e) => {
  // Remove `e.target` from the list of available ports.
});

navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});

button.addEventListener('click', () => {
  const usbVendorId = ...;
  navigator.serial.requestPort({ filters: [{ usbVendorId }]}).then((port) => {
    // Connect to `port` or add it to the list of available ports.
  }).catch((e) => {
    // The user didn't select a port.
  });
});
```
