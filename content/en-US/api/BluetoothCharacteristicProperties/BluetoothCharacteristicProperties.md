---
recipe: api-feature
title: 'BluetoothCharacteristicProperties'
mdn_url: /en-US/docs/Web/API/BluetoothCharacteristicProperties
specifications: https://webbluetoothcg.github.io/web-bluetooth/#bluetoothcharacteristicproperties
browser_compatibility: api.BluetoothCharacteristicProperties
---

## Description

The `BluetoothCharacteristicProperties` interface of the Web Bluetooth API
provides web developers with the operations that are valid on the given Generic
Attribute Profile (GATT) Characteristic.

## Properties

**`BluetoothCharacteristicProperties.broadcast`**

Returns a `boolean` that is `true` if the broadcast of the characteristic value
is permitted using the Server Characteristic Configuration Descriptor.

**`BluetoothCharacteristicProperties.read`**

Returns a `boolean` that is `true` if the reading of the characteristic value
is permitted.

**`BluetoothCharacteristicProperties.writeWithoutResponse`**

Returns a `boolean` that is `true` if the writing to the characteristic
without response is permitted.

**`BluetoothCharacteristicProperties.write`**

Returns a `boolean` that is `true` if the writing to the characteristic with
response is permitted.

**`BluetoothCharacteristicProperties.notify`**

Returns a `boolean` that is `true` if notifications of the characteristic
value without acknowledgement is permitted.

**`BluetoothCharacteristicProperties.indicate`**

Returns a `boolean` that is `true` if indications of the characteristic
value with acknowledgement is permitted.

**`BluetoothCharacteristicProperties.authenticatedSignedWrites`**

Returns a `boolean` that is `true` if signed writing to the characteristic
value is permitted.

**`BluetoothCharacteristicProperties.reliableWrite`**

Returns a `boolean` that is `true` if reliable writes to the characteristic is
permitted.

**`BluetoothCharacteristicProperties.writableAuxiliaries`**

Returns a `boolean` that is `true` if reliable writes to the characteristic
descriptor is permitted.

## Examples

The following example shows how tell if a GATT characteristic supports value
change notifications.

```js
let device = await navigator.bluetooth.requestDevice({
  filters: [{services: ['heart_rate']}]
});
let gatt = await device.gatt.connect();
let service = await gatt.getPrimaryService('heart_rate');
let characteristic = await service.getCharacteristic('heart_rate_measurement');
if (characteristic.properties.notify) {
  characteristics.addEventListener('characteristicvaluechanged',
      function(event) {
    console.log(`Received heart rate measurement: ${event.target.value}`);
  }
  await characteristic.startNotifications();
}
```
