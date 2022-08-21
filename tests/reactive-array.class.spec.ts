import { timer } from 'rxjs';
import { expect } from 'chai';
import { ReactiveArray } from '../src';

describe('reactive array', () =>
{
	it('create native instance', () =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		expect(reactiveArray).to.be.instanceof(Array);
		expect(reactiveArray[0]).to.be.equal(1);
	});

	it('mutable push', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>();

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 1)
			{
				done();
			}
		});
		reactiveArray.push(1);
	});

	it('unsubscribe is working', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>();

		reactiveArray.asObservable().subscribe(() => done('error'));
		reactiveArray.unsubscribe();
		reactiveArray.push(1);
		timer(100).subscribe(done);
	});
});
