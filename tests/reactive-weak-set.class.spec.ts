import { timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveWeakSet } from '../src';

describe('reactive weak set', () =>
{
	it('create native instance', () =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>([ object ]);

		expect(reactiveWeakSet).to.be.instanceof(WeakSet);
		expect(reactiveWeakSet.has(object)).to.be.true;
	});

	it('reactive add', done =>
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

	it('reactive delete', done =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>([ object ]);

		reactiveWeakSet.subscribe(weakSet =>
		{
			if (!weakSet.has(object))
			{
				done();
			}
		});
		reactiveWeakSet.delete(object);
	});

	it('unsubscribe is working', done =>
	{
		const object : object = {};
		const reactiveWeakSet : ReactiveWeakSet<object> = new ReactiveWeakSet<object>();

		reactiveWeakSet.asObservable().subscribe(() => done('error'));
		reactiveWeakSet.unsubscribe();
		reactiveWeakSet.add(object);
		timer(100).subscribe(done);
	});
});
