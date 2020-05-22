---
recipe: api-feature
title: 'USBInterface'
mdn_url: /en-US/docs/Web/API/USBInterface
specifications: https://wicg.github.io/webusb/#interfaces
browser_compatibility: api.USBInterface
---

## Description

The `USBInterface` interface of the WebUSB API provides information about an interface provided by the USB device. An interface represents a feature of the device which implements a particular protocol and may contain endpoints for bidirectional communication.

## Constructor

Creates a new `USBInterface` object which will be populated with information about the interface on the provided `USBConfiguration` with the given interface number.

## Properties

**`USBInterface.interfaceNumber`**

Returns the interface number of this interface. This is equal to the `bInterfaceNumber` field of the interface descriptor defining this interface.

**`USBInterface.alternate`**

Returns the currently selected alternative configuration of this interface. By default this is the `USBAlternateInterface` from `alternates` with `alternateSetting` equal to `0`. It can be changed by calling `USBDevice.selectAlternateInterface()` with any other value found in `alternates`.

**`USBInterface.alternates`**

Returns an array containing instances of the `USBAlternateInterface` interface describing each of the alternative configurations possible for this interface.

**`USBInterface.claimed`**

Returns whether or not this interface has been claimed by the current page by calling `USBDevice.claimInterface()`.
