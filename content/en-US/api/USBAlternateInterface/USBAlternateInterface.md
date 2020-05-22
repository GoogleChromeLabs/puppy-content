---
recipe: api-feature
title: 'USBAlternateInterface'
mdn_url: /en-US/docs/Web/API/USBAlternateInterface
specifications: https://wicg.github.io/webusb/#interfaces
browser_compatibility: api.USBAlternateInterface
---

## Description

The `USBAlternateInterface` interface of the WebUSB API provides information about a particular configuration of an interface provided by the USB device. An interface includes one or more alternate settings which can configure a set of endpoints based on the operating mode of the device.

## Constructor

Creates a new `USBAlternateInterface` object which will be populated with information about the alternate interface of the provided `USBInterface` with the given alternate setting number.

## Properties

**`USBAlternateInterface.alternateSetting`**

Returns the alternate setting number of this interface. This is equal to the `bAlternateSetting` field of the interface descriptor defining this interface.

**`USBAlternateInterface.interfaceClass`**

Returns the class of this interface. This is equal to the `bInterfaceClass` field of the interface descriptor defining this interface. [Standardized values](https://www.usb.org/defined-class-codes) for this field are defined by the USB Implementers Forum. A value of `0xFF` indicates a vendor-defined interface.

**`USBAlternateInterface.interfaceSubclass`**

Returns the subclass of this interface. This is equal to the `bInterfaceSubClass` field of the interface descriptor defining this interface. The meaning of this value depends on the `interfaceClass` field.

**`USBAlternateInterface.interfaceProtocol`**

Returns the protocol supported by this interface. This is equal to the `bInterfaceProtocol` field of the interface descriptor defining this interface. The meaning of this value depends on the `interfaceClass` and `interfaceSubclass` fields.

**`USBAlternateInterface.interfaceName`**

Returns the name of the interface, if one is provided by the device. This is the value of the string descriptor with the index specified by the `iInterface` field of the interface descriptor defining this interface.

**`USBAlternateInterface.endpoints`**

Returns an array containing instances of the `USBEndpoint` interface describing each of the endpoints that are part of this interface.
