---
recipe: api-interface
title: 'NDEFReadingEvent'
mdn_url: /en-US/docs/Web/API/NDEFReadingEvent
specifications: https://w3c.github.io/web-nfc/#dom-ndefreadingevent
browser_compatibility: api.NDEFReadingEvent
---

## Description

The `NDEFReadingEvent` interface of the Web NFC API provides information about a
tag when it is read.

This interface requires a secure context.

## Constructor

Creates a new `NDEFReadingEvent` object, initialized with the given properties.

## Properties

**`NDEFReadingEvent.serialNumber`**

Returns the serial number of the tag that was read.

**`NDEFReadingEvent.message`**

Returns the `NDEFMessage` that was read from the tag.

## Examples

### Read a single tag, once

This example show you how to easily create a convenience function that just
reads a single tag and then stops polling, saving battery life by cutting
unneeded work.

The example could easily be extended to time out after a given amount of
milliseconds.

```js
const ndef = new NDEFReader();

function read() {
  return new Promise((resolve, reject) => {
    const ctlr = new AbortController();
    ctlr.signal.onabort = reject;
    ndef.addEventListener("reading", event => {
      ctlr.abort();
      resolve(event);
    }, { once: true });
    ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
  });
}

read().then(({ serialNumber }) => {
  console.log(serialNumber);
});
```
