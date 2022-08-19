import { expect } from 'chai';
import { ReactiveMap } from '../src';

describe('reactive map', () =>
{
	it('create instance', () =>
	{
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>();

		expect(reactiveMap).to.be.instanceof(ReactiveMap);
		expect(reactiveMap.size).to.be.equal(0);
	});

	it('create instance from map', () =>
	{
		const map : Map<number, number> = new Map<number, number>([ [ 1, 1 ] ]);
		const reactiveMap : ReactiveMap<number, number> = new ReactiveMap<number, number>(map);

		expect(reactiveMap).to.be.instanceof(ReactiveMap);
		expect(reactiveMap.size).to.be.equal(1);
	});
});
