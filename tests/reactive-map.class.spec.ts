import { timer } from 'rxjs';
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

	it('mutable set', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		reactiveMap.subscribe(map =>
		{
			if (map.get(1) === 1)
			{
				done();
			}
		});
		reactiveMap.set(1, 1);
	});

	it('mutable delete', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		reactiveMap.subscribe(map =>
		{
			if (!map.has(1))
			{
				done();
			}
		});
		reactiveMap.delete(1);
	});

	it('mutable clear', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		reactiveMap.subscribe(map =>
		{
			if (!map.has(1))
			{
				done();
			}
		});
		reactiveMap.clear();
	});

	it('unsubscribe is working', done =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		reactiveMap.asObservable().subscribe(() => done('error'));
		reactiveMap.unsubscribe();
		reactiveMap.set(1, 1);
		timer(100).subscribe(done);
	});
});
