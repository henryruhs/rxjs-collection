import { Observable, Subject, Subscription } from 'rxjs';
import { reactive } from './reactive.helper';
import { ReactiveCollection } from './reactive.interface';

export class ReactiveSet<Type> extends Set<Type> implements ReactiveCollection<Set<Type>>
{
	protected store : Subject<Set<Type>> = new Subject<Set<Type>>();

	asObservable() : Observable<Set<Type>>
	{
		return this.store.asObservable();
	}

	subscribe(next : (value : Set<Type>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
	}
}

reactive(ReactiveSet, Set,
[
	'add',
	'delete',
	'clear'
]);
