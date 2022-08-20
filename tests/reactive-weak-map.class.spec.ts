import { expect } from 'chai';
import { ReactiveWeakMap } from '../src';

describe('reactive weak map', () =>
{
	it('create instance', () =>
	{
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>();

		expect(reactiveWeakMap).to.be.instanceof(ReactiveWeakMap);
	});

	it.skip('reactive set', done =>
	{
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>();

		reactiveWeakMap.asObservable().subscribe(reactiveWeakMap => reactiveWeakMap.get({}) ? done() : null);
		reactiveWeakMap.set({}, 1);
	});
});
