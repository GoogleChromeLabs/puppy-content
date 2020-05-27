---
recipe: api-feature
title: 'USBIsochronousInTransferResult'
mdn_url: /en-US/docs/Web/API/USBIsochronousInTransferResult
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.USBIsochronousInTransferResult
---

## Description

The `USBIsochronousInTransferResult` interface of the WebUSB API provides the result from a call to the `isochronousTransferIn()` method of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB device to the USB host.

## Constructor

Creates a new `USBIsochronousInTransferResult` object with the provided `packets` and `data` fields.

## Properties

**`USBIsochronousInTransferResult.data`**

Returns a `DataView` object containing the data received from the device. This is the combined data from all packets. See the individual `DataView` objects in the `packets` array for the portion of this buffer containing data from each packet.

**`USBIsochronousInTransferResult.packets`**

Returns an array of `USBIsochronousInTransferPacket` objects containing the result of each request to receive a packet from the device.
