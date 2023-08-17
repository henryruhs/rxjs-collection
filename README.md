RXJS Collection
===============

> RXJS enhanced Array, Map, WeakMap, Set and WeakSet.

[![Build Status](https://img.shields.io/github/actions/workflow/status/henryruhs/rxjs-collection/ci.yml.svg?branch=master)](https://github.com/henryruhs/rxjs-collection/actions?query=workflow:ci)
[![Coverage Status](https://coveralls.io/repos/github/henryruhs/rxjs-collection/badge.svg)](https://coveralls.io/github/henryruhs/rxjs-collection)
[![NPM Version](https://img.shields.io/npm/v/rxjs-collection.svg)](https://npmjs.com/package/rxjs-collection)
[![License](https://img.shields.io/npm/l/rxjs-collection.svg)](https://npmjs.com/package/rxjs-collection)


Installation
------------

```
npm install rxjs-collection
```


Usage
-----

Each collection has been enhanced with `asObservable` and `{un}subscribe` alike methods:

```typescript
import { ReactiveMap } from 'rxjs-collection';

const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

// subscribe to mutations
reactiveMap.asObservable().subscribe(map => map.has(1));
reactiveMap.subscribe(map => map.has(1));

// mutate the collection
reactiveMap.set(1, 1);

// unsubscribe from mutations
reactiveMap.unsubscribe();
```


Documentation
-------------

Read the [documentation](https://henryruhs.gitbook.io/rxjs-collection) for a deep dive.
