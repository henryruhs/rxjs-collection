import { Observable, Subject, Subscription } from 'rxjs';
import { reactivate } from './reactive.helper';
import { ReactiveCollection } from './reactive.interface';

export class ReactiveWeakSet<Type extends object> extends WeakSet<Type> implements ReactiveCollection<WeakSet<Type>>
{
	protected store : Subject<WeakSet<Type>> = new Subject<WeakSet<Type>>();

	asObservable() : Observable<WeakSet<Type>>
	{
		return this.store.asObservable();
	}

	subscribe(next : (value : WeakSet<Type>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactivate(ReactiveWeakSet, WeakSet,
[
	'add',
	'delete'
]);
