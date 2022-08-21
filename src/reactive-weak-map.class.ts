import { Observable, Subject, Subscription } from 'rxjs';
import { reactivate } from './reactive.helper';

export class ReactiveWeakMap<Key extends object, Value> extends WeakMap<Key, Value>
{
	protected store : Subject<WeakMap<Key, Value>> = new Subject<WeakMap<Key, Value>>();

	asObservable() : Observable<WeakMap<Key, Value>>
	{
		return this.store.asObservable();
	}

	subscribe(next : (value : WeakMap<Key, Value>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactivate(ReactiveWeakMap, WeakMap,
[
	'set',
	'delete'
]);
