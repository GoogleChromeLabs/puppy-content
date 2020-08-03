---
recipe: api-feature
title: '[[PeriodicSyncEvent]]'
mdn_url: /en-US/docs/Web/API/[[PeriodicSyncEvent]]
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.[[PeriodicSyncEvent]]
---

## Description

// Complete the sentence below with basic description of the API.
// You may add more sentences, if needed.

The `[[PeriodicSyncEvent]]` interface of the [[Web Periodic Background Sync]] provides a way to
run tasks in the service worker with network connectivity. The event is fired periodically after
periodic background sync request is registered.

## Constructor

// Complete the sentence below or replace it with "None.".

Creates a new `[[PeriodicSyncEvent]]` object. This constructor is not typically used. The browser
creates these objects itself and provides them to periodicSync event callbacks.

## Properties

**`[[PeriodicSyncEvent]].[[tag]]`**

This is read only, and returns the developer-defined identifer for this PeriodicSyncEvent.
Mutiple tags can be used by the web app to run different periodic tasks at different frequencies.

## Methods

Inherits methods from its parent `[[ExtendableEvent]]`

## Examples

The following example shows how to respond to a periodic sync event in the service worker.

```js
self.addEventListener('periodicsync', event => {
  if (event.tag == 'get-latest-news') {
    event.waitUntil(fetchAndCacheLatestNews());
  }
});fevent
fevent

```
