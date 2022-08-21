import { expect } from 'chai';
import {ReactiveMap, ReactiveWeakMap} from '../src';

describe('reactive weak map', () =>
{
	it('create instance', () =>
	{
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>();

		expect(reactiveWeakMap).to.be.instanceof(WeakMap);
	});

	it('create instance from iterable', () =>
	{
		const object : object = {};
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>([ [ object, 1 ] ]);

		expect(reactiveWeakMap).to.be.instanceof(WeakMap);
		expect(reactiveWeakMap.has(object)).to.be.true;
	});

	it('reactive set', done =>
	{
		const object : object = {};
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>();

		reactiveWeakMap.subscribe(weakMap =>
		{
			if (weakMap.get(object) === 1)
			{
				done();
			}
		});
		reactiveWeakMap.set(object, 1);
	});
});
