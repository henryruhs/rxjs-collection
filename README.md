RXJS Collection
===============

> RXJS enhanced Map, WeakMap, Set and WeakSet implementation.

[![Build Status](https://img.shields.io/github/workflow/status/henryruhs/rxjs-collection/ci.svg)](https://github.com/henryruhs/rxjs-collection/actions?query=workflow:ci)
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

`Reactive{Map,WeakMap,Set,WeakSet}` have been enhanced by `subscribe()`and `unsubscribe()` methods:

```typescript
const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

reactiveMap.subscribe(map => map.has(1));
reactiveMap.set(1, 1);
reactiveMap.unsubscribe();
```
