import { Observable, Subject, Subscription, debounceTime } from 'rxjs';

import { reactive } from './reactive.helper';
import { ReactiveCollection } from './reactive.interface';

export class ReactiveArray<Type> extends Array<Type> implements ReactiveCollection<Array<Type>>
{
	protected store : Subject<Array<Type>> = new Subject<Array<Type>>();

	asObservable() : Observable<Array<Type>>
	{
		return this.store.asObservable().pipe(debounceTime(0));
	}

	subscribe(next : (value : Array<Type>) => void) : Subscription
	{
		return this.store.pipe(debounceTime(0)).subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactive(ReactiveArray, Array,
[
	'copyWithin',
	'fill',
	'pop',
	'push',
	'reverse',
	'shift',
	'sort',
	'splice',
	'unshift'
]);
