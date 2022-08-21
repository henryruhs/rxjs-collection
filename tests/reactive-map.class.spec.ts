import { expect } from 'chai';
import { ReactiveMap } from '../src';

describe('reactive map', () =>
{
	it('create instance', () =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		expect(reactiveMap).to.be.instanceof(Map);
		expect(reactiveMap.size).to.be.equal(0);
	});

	it('create instance from iterable', () =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>([ [ 1, 1 ] ]);

		expect(reactiveMap).to.be.instanceof(Map);
		expect(reactiveMap.has(1)).to.be.true
	});

	it('reactive set', done =>
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
});
