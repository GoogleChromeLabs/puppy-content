---
recipe: api-feature
title: '[[Periodic Sync Manager]]'
mdn_url: /en-US/docs/Web/API/[[periodic-sync-manager]]
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.[[PeriodicSyncManager]]
---

## Description

The `[[PeriodicSyncManager]]` interface of [[Web Periodic Background Sync]] provides a way to
register tasks to be run in a service worker at periodic intervals with network connectivity. These
tasks are referred to as periodic background sync requests.

## Constructor

`[[PeriodicSyncManager]]` is created by accessing the `periodicSync` attribute of a service worker
registration.

## Methods

**`[[PeriodicSyncManager]].[[register]]`**

Registers a periodic sync request with the browser with the specified tag and options. Returns a
Promise object that resolves when the registration completes.

**`[[PeriodicSyncManager]].[[getTags]]`**

Returns a Promise object that resolves to a sequence of DOMString objects representing the tags
that are currently registered for periodic syncing.

**`[[PeriodicSyncManager]].[[unregister]]`**

Unregisters the periodic sync request corresponding to the specified tag. Returns a Promise object
that resolves when unregistration completes.

## Examples

The following examples show how to use the interface. The code should live on the service worker
client page.

### Requesting a periodic sync
```
  navigator.serviceWorker.ready.then(registration => {
    registration.periodicSync.getTags().then(tags => {
      if (tags.includes('get-latest-news'))
        skipDownloadingLatestNewsOnPageLoad();
    });  
  });

```

### Checking if a periodic sync task with a given tag is registered
```
navigator.serviceWorker.ready.then(registration => {
  registration.periodicSync.getTags().then(tags => {
    if (tags.includes('get-latest-news'))
      skipDownloadingLatestNewsOnPageLoad();
  });  
});
```

# Removing a periodic sync to stop syncing articles in the background
```
navigator.serviceWorker.ready.then(registration => {
  registration.periodicSync.unregister('get-latest-news');
});
```
