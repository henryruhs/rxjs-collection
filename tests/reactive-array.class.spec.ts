import { filter, timer } from 'rxjs';
import { expect } from 'chai';

import { ReactiveArray, hyperactive } from '../src';

describe('reactive array', () =>
{
	it('create native instance', () =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		expect(reactiveArray).to.be.instanceof(Array);
		expect(reactiveArray.at(0)).to.be.equal(1);
	});

	it('hyperactive define property', done =>
	{
		const reactiveArray : ReactiveArray<number> = hyperactive(new ReactiveArray<number>());

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 1)
			)
			.subscribe(() => done());

		reactiveArray[0] = 1;
	});

	it('hyperactive delete property', done =>
	{
		const reactiveArray : ReactiveArray<number> = hyperactive(new ReactiveArray<number>(1, 2, 3));

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => !array.at(0))
			)
			.subscribe(() => done());

		delete reactiveArray[0];
	});

	it('hyperactive push is calm', done =>
	{
		const reactiveArray : ReactiveArray<number> = hyperactive(new ReactiveArray<number>());

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 1)
			)
			.subscribe(() => done());

		reactiveArray.push(1);
	});

	it('reactive copy within', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 3)
			)
			.subscribe(() => done());

		reactiveArray.copyWithin(0, 2);
	});

	it('reactive fill', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(2) === 1)
			)
			.subscribe(() => done());

		reactiveArray.fill(1);
	});

	it('reactive pop', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(-1) === 2)
			)
			.subscribe(() => done());

		reactiveArray.pop();
	});

	it('reactive push', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>();

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 1)
			)
			.subscribe(() => done());

		reactiveArray.push(1);
	});

	it('reactive reverse', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 3)
			)
			.subscribe(() => done());

		reactiveArray.reverse();
	});

	it('reactive shift', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 2)
			)
			.subscribe(() => done());

		reactiveArray.shift();
	});

	it('reactive sort', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(3, 2, 1);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 1)
			)
			.subscribe(() => done());

		reactiveArray.sort();
	});

	it('reactive splice', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(1, 2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 2)
			)
			.subscribe(() => done());

		reactiveArray.splice(0, 1);
	});

	it('reactive unshift', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>(2, 3);

		reactiveArray
			.asObservable()
			.pipe(
				filter(array => array.at(0) === 1)
			)
			.subscribe(() => done());

		reactiveArray.unshift(1);
	});

	it('unsubscribe is working', done =>
	{
		const reactiveArray : ReactiveArray<number> = new ReactiveArray<number>();

		reactiveArray.asObservable().subscribe(() => done('error'));
		reactiveArray.unsubscribe();
		reactiveArray.push(1);
		timer(100).subscribe(() => done());
	});
});
