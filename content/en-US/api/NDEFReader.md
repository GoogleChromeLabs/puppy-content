---
recipe: api-interface
title: 'NDEFReader'
mdn_url: /en-US/docs/Web/API/NDEFReader
specifications: https://w3c.github.io/web-nfc/#dom-ndefreader
browser_compatibility: api.NDEFReader
---

## Description

The `NDEFReader` interface of the Web NFC API provides the ability to read and
write NDEF messages to NFC tags.

This interface requires a secure context.

## Constructor

Creates a new `NDEFReader` object.

## Events

**`NDEFReader.onreading`**

Called when a tag is read. This method receives an `NDEFReadingEvent` object.

**`NDEFReader.onreadingerror`**

Called when a tag is in proximity but cannot be read. This method receives an
`Event` object.

## Methods

**`NDEFReader.scan()`**

Prepares to read an NDEF messsage from an NFC tag when one comes into proximity.
If the site does not already have the `"nfc"` permission this method must be
called with user activation in order to show a permission prompt. Returns a
`Promise` which resolves when the NFC capabilities have been activated or
rejects if a hardware or permission error is encountered.

**`NDEFReader.write()`**

Prepares to write an NDEF message to an NFC tag when one comes into proximity.
If the site does not already have the `"nfc"` permission this method must be
called with user activation in order to show a permission prompt. Returns a
`Promise` which resolves when the message has been written or rejects if a
hardware or permission error is encountered.

## Examples

### Write a text string

Writing a text string to an NFC tag is straightforward.

```js
const ndef = new NDEFReader();
ndef.write(
  "Hello World"
).then(() => {
  console.log("Message written.");
}).catch(error => {
  console.log(`Write failed :-( try again: ${error}.`);
});
```

### Write a URL

In order to write an NDEF record of URL type, pass an object to construct the
`NDEFMessage`.

```
const ndef = new NDEFReader();
try {
  await ndef.write({
    records: [{ recordType: "url", data: "https://w3c.github.io/web-nfc/" }]
  });
} catch {
  console.log("Write failed :-( try again.");
};
```

### Handling initial reads while writing

In order to write, a tag needs to be found and thus read. This gives you the
ability to check whether it is actually a tag that you want to write to or not,
by checking existing data or serial number.

For this reason, it is recommended to call `write()` from a `reading` event.

The below example shows how to coordinate between a common `reading` handler and
one used specifically for a single write.

```js
const ndef = new NDEFReader();
let ignoreRead = false;

ndef.onreading = (event) => {
  if (ignoreRead) {
    return; // write pending, ignore read.
  }

  console.log("We read a tag, but not during pending write!");
};

function write(data) {
  ignoreRead = true;
  return new Promise((resolve, reject) => {
    ndef.addEventListener("reading", event => {
      // Check if we want to write to this tag, or reject.
      ndef.write(data).then(resolve, reject).finally(() => ignoreRead = false);
    }, { once: true });
  });
}

await ndef.scan();
try {
  await write("Hello World");
  console.log("We wrote to a tag!")
} catch(err) {
  console.error("Something went wrong", err);
}
```

### Scheduling a write with a timeout

It can sometimes be useful to set a time limit on a write operation. For example, you
ask the user to touch a tag, and if no tag is found within a certain amount of
time, then you time out.

```js
const ndef = new NDEFReader();
ndef.onreading = (event) => console.log("We read a tag!");

function write(data, { timeout } = {}) {
  return new Promise((resolve, reject) => {
    const ctlr = new AbortController();
    ctlr.signal.onabort = () => reject("Time is up, bailing out!");
    setTimeout(() => ctlr.abort(), timeout);

    ndef.addEventListener("reading", event => {
      ndef.write(data, { signal: ctlr.signal }).then(resolve, reject);
    }, { once: true });
  });
}

await ndef.scan();
try {
  // Let's wait for 5 seconds only.
  await write("Hello World", { timeout: 5_000 });
} catch(err) {
  console.error("Something went wrong", err);
} finally {
  console.log("We wrote to a tag!");
}
```

### Handle scanning errors

This example shows what happens when a scan promise rejects and `readingerror` is
fired.

```js
const ndef = new NDEFReader();
ndef.scan().then(() => {
  console.log("Scan started successfully.");
  ndef.onreadingerror = (event) => {
    console.log("Error! Cannot read data from the NFC tag. Try a different one?");
  };
  ndef.onreading = (event) => {
    console.log("NDEF message read.");
  };
}).catch(error => {
  console.log(`Error! Scan failed to start: ${error}.`);
});
```
