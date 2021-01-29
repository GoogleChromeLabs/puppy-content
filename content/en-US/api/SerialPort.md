---
recipe: api-interface
title: 'SerialPort'
mdn_url: /en-US/docs/Web/API/SerialPort
specifications: https://wicg.github.io/serial/#serialport-interface
browser_compatibility: api.SerialPort
---

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API).**

## Description

The `SerialPort` interface of the Web Serial API provides access to a serial
port on the host device. Instances of this interface may be obtained by calling
`navigator.serial.requestPort()` to request permission to access a port from the
user. Ports that an origin has already been granted permission to access are
available from `navigator.serial.getPorts()` or by listening for `connect`
events fired at `navigator.serial`.

This interface requires a secure context.

## Constructor

None.

## Properties

**`SerialPort.readable`**

Returns a `ReadableStream` for receiving data from the device connected to the
port. Chunks read from this stream will be instances of `Uint8Array`. This
property will be non-null as long as the port is open and has not encountered a
fatal error.

**`SerialPort.writable`**

Returns a `WritableStream` for sending data to the device connected to the port.
Chunks written to this stream must be instances of `BufferSource` (e.g. an
`ArrayBuffer` or `ArrayBufferView` such as `Uint8Array`). This property will be
non-null as long as the port is open and has not encountered a fatal error.

## Events

**`SerialPort.onconnect`**

Called when the port has been connected to the device. This method receives an
`Event` object. This event is only fired for ports associated with removable
devices such as those connected via USB. This event bubbles to the instance of
`navigator.serial` which returned this interface.

**`SerialPort.ondisconnect`**

Called when the port has been disconnected from the device. This method receives
an `Event` object. This event is only fired for ports associated with removable
devices such as those connected via USB. This event bubbles to the instance of
`navigator.serial` which returned this interface.

## Methods

**`SerialPort.getInfo()`**

Returns a `Promise` that resolves with a `SerialPortInfo` containing properties
of the port.

**`SerialPort.open()`**

Returns a `Promise` that resolves when the port has been opened. By default the
port will be opened with 8 data bits, 1 stop bit and no parity checking. The
`baudRate` parameter is required.

**`SerialPort.setSignals()`**

Returns a `Promise` that resolves when the port's control signals have been set.

**`SerialPort.getSignals()`**

Returns a `Promise` that resolves with a `SerialInputSignals` containing the
current state of the port's control signals.

**`SerialPort.close()`**

Returns a `Promise` that resolves when the port has been closed.

## Examples

### Opening a port

Before communicating on a serial port it must be opened. Opening the port allows
the site to specify the necessary parameters which control how data is
transmitted and received. Developers should check the documentation for the
device they are connecting to for the appropriate parameters.

```js
await port.open({ baudRate: /* pick your baud rate */ });
```

Once the `Promise` returned by `open()` has resolved the `readable` and
`writable` attributes can be accessed to get the `ReadableStream` and
`WritableStream` instances for receiving data from and sending data to the
connected device.

### Reading data from a port

The following example shows how to read data from a port. The outer loop handles
non-fatal errors, creating a new reader until a fatal error is encountered and
`readable` becomes `null`.

```js
while (port.readable) {
  const reader = port.readable.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // |reader| has been canceled.
        break;
      }
      // Do something with |value|...
    }
  } catch (error) {
    // Handle |error|...
  } finally {
    reader.releaseLock();
  }
}
```

### Writing data to a port

The following example shows how to write a string to a port. A `TextEncoder` is
used to convert the string to a `Uint8Array` before transmission. 

```js
const encoder = new TextEncoder();
const writer = port.writable.getWriter();
await writer.write(encoder.encode("PING"));
writer.releaseLock();
```
