---
recipe: api-feature
title: '[[USBIsochronousInTransferPacket]]'
mdn_url: /en-US/docs/Web/API/[[USBIsochronousInTransferPacket]]
specifications: https://wicg.github.io/webusb/#transfers
browser_compatibility: api.[[USBIsochronousInTransferPacket]]
---

## Description

The `USBIsochronousInTransferPacket` interface of the WebUSB API is part of the response from a call to the `isochronousTransferIn()` method of the `USBDevice` interface. It represents the status of an individual packet from a request to transfer data from the USB device to the USB host over an isochronous endpoint.

## Constructor

Creates a new `USBIsochronousInTransferPacket` object with the provided `status` and `data` fields.

## Properties

**`USBIsochronousInTransferPacket.data`**

Returns a `DataView` object containing the data received from the USB device in this packet, if any.

**`USBIsochronousInTransferPacket.status`**

Returns the status of the transfer request, one of:

* `"ok"` - The transfer was successful.
* `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on an isochronous endpoint does not need to be cleared.
* `"babble"` - The device responded with more data than was expected.
