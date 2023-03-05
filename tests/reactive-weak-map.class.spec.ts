import { filter, timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveWeakMap } from '../src';

describe('reactive weak map', () =>
{
	it('create native instance', () =>
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

		reactiveWeakMap
			.asObservable()
			.pipe(
				filter(weakMap => weakMap.get(object) === 1)
			)
			.subscribe(() => done());

		reactiveWeakMap.set(object, 1);
	});

	it('reactive delete', done =>
	{
		const object : object = {};
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>([ [ object, 1 ] ]);

		reactiveWeakMap
			.asObservable()
			.pipe(
				filter(weakMap => !weakMap.has(object))
			)
			.subscribe(() => done());

		reactiveWeakMap.delete(object);
	});

	it('unsubscribe is working', done =>
	{
		const object : object = {};
		const reactiveWeakMap : ReactiveWeakMap<object, number> = new ReactiveWeakMap<object, number>();

		reactiveWeakMap.asObservable().subscribe(() => done('error'));
		reactiveWeakMap.unsubscribe();
		reactiveWeakMap.set(object, 1);
		timer(100).subscribe(() => done());
	});
});
