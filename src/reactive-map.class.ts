import { Observable, Subject, Subscription } from 'rxjs';
import { reactivate } from './reactive.helper';

export class ReactiveMap<Key, Value> extends Map<Key, Value>
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

reactivate(ReactiveMap, Map,
[
	'set',
	'delete',
	'clear'
]);
