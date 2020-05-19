---
recipe: api-feature
title: '[[USBIsochronousOutTransferPacket]]'
mdn_url: /en-US/docs/Web/API/[[USBIsochronousOutTransferPacket]]
specifications: https://wicg.github.io/webusb/#transfers
browser_compatibility: api.[[USBIsochronousOutTransferPacket]]
---

## Description

The `USBIsochronousOutTransferPacket` interface of the WebUSB API is part of the response from a call to the `isochronousTransferOut()` method of the `USBDevice` interface. It represents the status of an individual packet from a request to transfer data from the USB host to the USB device over an isochronous endpoint.

## Constructor

Creates a new `USBIsochronousOutTransferPacket` object with the provided `status` and `bytesWritten` fields.

## Properties

**`USBIsochronousOutTransferPacket.bytesWritten`**

Returns the number of bytes from the packet that were sent to the device.

**`USBIsochronousOutTransferPacket.status`**

Returns the status of the transfer request, one of:

* `"ok"` - The transfer was successful.
* `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on an isochronous endpoint does not need to be cleared.
