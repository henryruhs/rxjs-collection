import { Observable, Subject, Subscription } from 'rxjs';
import { reactivate } from './reactive.helper';

export class ReactiveArray<Type> extends Array<Type>
{
	protected store : Subject<Array<Type>> = new Subject<Array<Type>>();

	asObservable() : Observable<Array<Type>>
	{
		return this.store.asObservable();
	}

	subscribe(next : (value : Array<Type>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactivate(ReactiveArray, Array,
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
