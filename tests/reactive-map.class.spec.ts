import { filter, timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveMap } from '../src';

describe('reactive map', () =>
{
	it('create native instance', () =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		expect(reactiveMap).to.be.instanceof(Map);
		expect(reactiveMap.has(1)).to.be.true;
	});

	it('reactive set', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		reactiveMap
			.asObservable()
			.pipe(
				filter(map => map.get(1) === 1)
			)
			.subscribe(() => done());

		reactiveMap.set(1, 1);
	});

	it('reactive delete', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		reactiveMap
			.asObservable()
			.pipe(
				filter(map => !map.has(1))
			)
			.subscribe(() => done());

		reactiveMap.delete(1);
	});

	it('reactive clear', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		reactiveMap
			.asObservable()
			.pipe(
				filter(map => !map.has(1))
			)
			.subscribe(() => done());

		reactiveMap.clear();
	});

	it('unsubscribe is working', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		reactiveMap.asObservable().subscribe(() => done('error'));
		reactiveMap.unsubscribe();
		reactiveMap.set(1, 1);
		timer(100).subscribe(() => done());
	});
});
