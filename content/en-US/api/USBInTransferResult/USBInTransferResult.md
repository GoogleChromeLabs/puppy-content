---
recipe: api-feature
title: '[[USBInTransferResult]]'
mdn_url: /en-US/docs/Web/API/[[USBInTransferResult]]
specifications: https://wicg.github.io/webusb/#transfers
browser_compatibility: api.[[USBInTransferResult]]
---

## Description

The `USBInTransferResult` interface of the WebUSB API provides the result from a call to the `transferIn()` and `controlTransferIn()` methods of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB device to the USB host.

## Constructor

Creates a new `USBInTransferResult` object with the provided `status` and `data` fields.

## Properties

**`USBInTransferResult.data`**

Returns a `DataView` over the data returned from the USB device, if any.

**`USBInTransferResult.status`**

Returns the status of the transfer request, one of:

* `"ok"` - The transfer was successful.
* `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on the control endpoint does not need to be cleared. For other pipes a call to `clearHalt()` is required before `transferIn()` can be called again.
* `"babble"` - The device responded with more data than was expected.
