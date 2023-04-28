import { Observable, Subject, Subscription } from 'rxjs';

import { reactive } from './reactive.helper';
import { ReactiveCollection } from './reactive.interface';

export class ReactiveMap<Key, Value> extends Map<Key, Value> implements ReactiveCollection<Map<Key, Value>>
{
	protected store : Subject<Map<Key, Value>> = new Subject<Map<Key, Value>>();

	asObservable() : Observable<Map<Key, Value>>
	{
		return this.store.asObservable();
	}

	subscribe(next : (value : Map<Key, Value>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactive(ReactiveMap, Map,
[
	'set',
	'delete',
	'clear'
]);
