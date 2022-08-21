import { expect } from 'chai';
import { ReactiveSet } from '../src';

describe('reactive set', () =>
{
	it('create instance', () =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>();

		expect(reactiveSet).to.be.instanceof(Set);
	});

	it('create instance from iterable', () =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>([ 1 ]);

		expect(reactiveSet.has(1)).to.be.true;
	});

	it('mutable add', done =>
	{
		const reactiveSet : ReactiveSet<number> = new ReactiveSet<number>();

		reactiveSet.subscribe(set =>
		{
			if (set.has(1))
			{
				done();
			}
		});
		reactiveSet.add(1);
	});
});
