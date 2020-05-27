---
recipe: api-feature
title: 'USBIsochronousOutTransferResult'
mdn_url: /en-US/docs/Web/API/USBIsochronousOutTransferResult
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.USBIsochronousOutTransferResult
---

## Description

The `USBIsochronousOutTransferResult` interface of the WebUSB API provides the result from a call to the `isochronousTransferOut()` method of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB host to the USB device.

## Constructor

Creates a new `USBIsochronousOutTransferResult` object with the provided `packet` field.

## Properties

**`USBIsochronousOutTransferResult.packets`**

Returns an array of `USBIsochronousOutTransferPacket` objects containing the result of each request to send a packet to the device.
