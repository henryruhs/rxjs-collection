import { filter, timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveSet } from '../src';

describe('reactive set', () =>
{
	it('create native instance', () =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>([ 1 ]);

		expect(reactiveSet).to.be.instanceof(Set);
		expect(reactiveSet.has(1)).to.be.true;
	});

	it('reactive add', done =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>();

		reactiveSet
			.asObservable()
			.pipe(
				filter(set => set.has(1))
			)
			.subscribe(() => done());

		reactiveSet.add(1);
	});

	it('reactive delete', done =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>([ 1 ]);

		reactiveSet
			.asObservable()
			.pipe(
				filter(set => !set.has(1))
			)
			.subscribe(() => done());

		reactiveSet.delete(1);
	});

	it('reactive clear', done =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>([ 1 ]);

		reactiveSet
			.asObservable()
			.pipe(
				filter(set => !set.has(1))
			)
			.subscribe(() => done());

		reactiveSet.clear();
	});

	it('unsubscribe is working', done =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>();

		reactiveSet.asObservable().subscribe(() => done('error'));
		reactiveSet.unsubscribe();
		reactiveSet.add(1);
		timer(100).subscribe(() => done());
	});
});
