---
recipe: api-feature
title: 'USBOutTransferResult'
mdn_url: /en-US/docs/Web/API/USBOutTransferResult
specifications: https://wicg.github.io/webusb/#transfers
browser_compatibility: api.USBOutTransferResult
---

## Description

The `USBOutTransferResult` interface of the WebUSB API provides the result from a call to the `transferOut()` and `controlTransferOut()` methods of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB host to the USB device.

## Constructor

Creates a new `USBOutTransferResult` object with the provided `status` and `bytesWritten` fields.

## Properties

**`USBOutTransferResult.bytesWritten`**

Returns the number of bytes from the transfer request that were sent to the device.

**`USBOutTransferResult.status`**

Returns the status of the transfer request, one of:

* `"ok"` - The transfer was successful.
* `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on the control endpoint does not need to be cleared. For other pipes a call to `clearHalt()` is required before `transferOut()` can be called again.
