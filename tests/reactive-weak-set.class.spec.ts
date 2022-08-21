import { timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveWeakSet } from '../src';

describe('reactive weak set', () =>
{
	it('create instance', () =>
	{
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>();

		expect(reactiveWeakSet).to.be.instanceof(WeakSet);
	});

	it('create instance from iterable', () =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>([ object ]);

		expect(reactiveWeakSet.has(object)).to.be.true;
	});

	it('mutable add', done =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>();

		reactiveWeakSet.subscribe(weakSet =>
		{
			if (weakSet.has(object))
			{
				done();
			}
		});
		reactiveWeakSet.add(object);
	});

	it('unsubscribe is working', done =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>();

		reactiveWeakSet.subscribe(() => done('error'));
		reactiveWeakSet.unsubscribe();
		reactiveWeakSet.add(object);
		timer(100).subscribe(done);
	});
});
