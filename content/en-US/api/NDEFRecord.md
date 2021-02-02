---
recipe: api-interface
title: 'NDEFRecord'
mdn_url: /en-US/docs/Web/API/NDEFRecord
specifications: https://w3c.github.io/web-nfc/#dom-ndefrecord
browser_compatibility: api.NDEFRecord
---

## Description

The `NDEFRecord` interface of the Web NFC API provides the content of an NDEF
record that has been read from or could be written to an NFC tag.

This interface requires a secure context.

## Constructor

Creates a new `NDEFRecord` object, initialized with the given payload
parameters.

## Properties

**`NDEFRecord.recordType`**

Returns the record type of the record. Records must have either a standardized
well known type name such as `"empty"`, `"text"`, `"url"`, `"smart-poster"`,
`"absolute-url"`, `"mime"` or `"unknown"` or an external type name which
consists of a domain name and custom type name separated by a colon (`":"`).

**`NDEFRecord.mediaType`**

Returns the MIME type of the record. Will be `null` if `recordType` is not equal
to `"mime"`. 

**`NDEFRecord.id`**

Returns the record identifier, which is an absolute or relative URL used to
identify the record.

**`NDEFRecord.data`**

Returns the raw bytes of the record's payload.

**`NDEFRecord.encoding`**

Returns the encoding of a textual payload and `null` otherwise.

**`NDEFRecord.lang`**

Returns the language of a textual payload and `null` otherwise.

## Methods

**`NDEFRecord.toRecords()`**

Parses the payload of a record and returns the NDEF records it contains. This
allows parsing the payloads of record types which may contain nested records
such as smart poster and external type records.

## Examples

### Write and read JSON (serialized and deserialized)

Storing and receiving JSON data is easy with serialization and deserialization.

```js
const ndef = new NDEFReader();
await ndef.scan();
ndef.onreading = (event) => {
  const decoder = new TextDecoder();
  for (const record of event.message.records) {
    if (record.mediaType === "application/json") {
      const json = JSON.parse(decoder.decode(record.data));
      const article =/^[aeio]/i.test(json.title) ? "an" : "a";
      console.log(`${json.name} is ${article} ${json.title}`);
    }
  }
};

const encoder = new TextEncoder();
await ndef.write({
  records: [
    {
      recordType: "mime",
      mediaType: "application/json",
      data: encoder.encode(JSON.stringify({
        name: "Benny Jensen",
        title: "Banker"
      }))
    },
    {
      recordType: "mime",
      mediaType: "application/json",
      data: encoder.encode(JSON.stringify({
        name: "Zoey Braun",
        title: "Engineer"
      }))
    }]
});
```

### Read an external record with an NDEF message as payload

Use external type records to create application defined records. These
records may contain an NDEF message as payload, with its own NDEF records,
including local types that are used in the context of the application.

Note that the smart poster record type also contains an NDEF message as payload.

As NDEF gives no guarantee on the ordering of records, using an external type
record with an NDEF message as payload, can be useful for encapsulating related
data.

This example shows how to read an external record for social posts, which
contains an NDEF message, containing a text record and a record with the local
type "act" (action), with a definition borrowed from smart poster, but used in
local application context.

```js
const ndef = new NDEFReader();
await ndef.scan();
ndef.onreading = (event) => {
  const externalRecord = event.message.records.find(
    record => record.type == "example.com:smart-poster"
  );

  let action, text;

  for (const record of externalRecord.toRecords()) {
    if (record.recordType == "text") {
      const decoder = new TextDecoder(record.encoding);
      text = decoder.decode(record.data);
    } else if (record.recordType == ":act") {
      action = record.data.getUint8(0);
    }
  }

  switch (action) {
    case 0: // do the action
      console.log(`Post "${text}" to timeline`);
      break;
    case 1: // save for later
      console.log(`Save "${text}" as a draft`);
      break;
    case 2: // open for editing
      console.log(`Show editable post with "${text}"`);
      break;
  }
};
```
