---
recipe: api-interface
title: 'NDEFMessage'
mdn_url: /en-US/docs/Web/API/NDEFMessage
specifications: https://w3c.github.io/web-nfc/#dom-ndefmessage
browser_compatibility: api.NDEFMessage
---

## Description

The `NDEFMessage` interface of the Web NFC API represents the content of an NDEF
message that has been read from or could be written to an NFC tag.

This interface requires a secure context.

## Constructor

Creates a new `NDEFMessage` object, initialized with the given NDEF records.

## Properties

**`NDEFMessage.records`**

Returns the list of NDEF records contained in the message.
