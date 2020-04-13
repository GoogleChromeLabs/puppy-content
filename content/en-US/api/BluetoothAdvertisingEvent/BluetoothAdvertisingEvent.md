---
recipe: api-feature
title: 'BluetoothAdvertisingEvent'
mdn_url: /en-US/docs/Web/API/BluetoothAdvertisingEvent
specifications: https://webbluetoothcg.github.io/web-bluetooth/#bluetoothadvertisingevent
browser_compatibility: api.BluetoothAdvertisingEvent
---

## Description

The `BluetoothAdvertisingEvent` interface of the Web Bluetooth API provides web
developers with Bluetooth advertisement packet data received by the system's
Bluetooth adapter.

## Properties

**`BluetoothAdvertisingEvent.device`**

Returns a `BluetoothDevice` object representing the advertisement packet that
was received.

**`BluetoothAdvertisingEvent.uuids`**

Returns a `FrozenArray<UUID>` containing the list of Generic Attribute
Profile (GATT) services that the device advertised.

**`BluetoothAdvertisingEvent.name`**

Returns a `DOMString` containing the advertised name of the Bluetooth device.
This value can be null if the device did not advertise it.

**`BluetoothAdvertisingEvent.appearance`**

Returns an `unsigned short` containing the advertised Generic Access Profile
(GAP) appearance of the Bluetooth device. The appearance value is composed of
a 10-bit category and 6-bit sub-category value for specifying the external
appearance of the device. This value can be null if the device did not
advertise it.

**`BluetoothAdvertisingEvent.txPower`**

Returns a `byte` containing the transmission power in dBm at which the device is
broadcasting advertisement packets. This value can be null if the device did not
advertise it.

**`BluetoothAdvertisingEvent.rssi`**

Returns a `byte` containing the received signal strength indicator (RSSI), which
is the power in dBm at which the advertisement was received. This value can
be null if the adapter did not make this value available.

**`BluetoothAdvertisingEvent.manufacturerData`**

Returns a `BluetoothManufacturerDataMap` object that contains a mapping of
`unsigned short` Company Identifier Codes to `DataView`s of manufacturer data.

**`BluetoothAdvertisingEvent.serviceData`**

Returns a `BluetoothServiceDataMap` object that contains a mapping of service
`UUID`s to `DataView`s of service data.

## Methods

**`BluetoothAdvertisingEvent.BluetoothAdvertisingEvent()`**

Creates a new `BluetoothAdvertisingEvent`.

## Examples

The following example shows

```js
let device = await navigator.bluetooth.requestDevice({acceptAllDevices: true});
device.addEventListener('advertisementreceived', function(event) {
  console.log(`Received an advertisement packet for ${event.name}`);
});
```
