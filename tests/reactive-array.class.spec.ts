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

	it('mutable copy within', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 3)
			{
				done();
			}
		});
		reactiveArray.copyWithin(0, 2);
	});

	it('mutable fill', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[2] === 1)
			{
				done();
			}
		});
		reactiveArray.fill(1);
	});

	it('mutable pop', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[array.length - 1] === 2)
			{
				done();
			}
		});
		reactiveArray.pop();
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

	it('mutable reverse', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 3)
			{
				done();
			}
		});
		reactiveArray.reverse();
	});

	it('mutable shift', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 2)
			{
				done();
			}
		});
		reactiveArray.shift();
	});

	it('mutable sort', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(3, 2, 1);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 1)
			{
				done();
			}
		});
		reactiveArray.sort();
	});

	it('mutable splice', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 2)
			{
				done();
			}
		});
		reactiveArray.splice(0, 1);
	});

	it('mutable unshift', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(2, 3);

		reactiveArray.subscribe(array =>
		{
			if (array[0] === 1)
			{
				done();
			}
		});
		reactiveArray.unshift(1);
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
