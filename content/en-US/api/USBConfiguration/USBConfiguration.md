---
recipe: api-feature
title: 'USBConfiguration'
mdn_url: /en-US/docs/Web/API/USBConfiguration
specifications: https://wicg.github.io/webusb/#configurations
browser_compatibility: api.USBConfiguration
---

## Description

The `USBConfiguration` interface of the WebUSB API provides information about a particular configuration of a USB device and the interfaces that it supports.

## Constructor

Creates a new `USBConfiguration` object which will be populated with information about the configuration on the provided `USBDevice` with the given configuration value.

## Properties

**`USBConfiguration.configurationValue`**

Returns the configuration value of this configuration. This is equal to the `bConfigurationValue` field of the configuration descriptor provided by the device defining this configuration.

**`USBConfiguration.configurationName`**

Returns the name provided by the device to describe this configuration. This is equal to the value of the string descriptor with the index provided in the `iConfiguration` field of the configuration descriptor defining this configuration.

**`USBConfiguration.interfaces`**

Returns an array containing instances of the `USBInterface` interface describing each interface supported by this configuration.
