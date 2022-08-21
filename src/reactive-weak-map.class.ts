import { Observable, Subject, Subscription } from 'rxjs';

export class ReactiveWeakMap<Key extends object, Value> extends WeakMap<Key, Value>
{
	protected store : Subject<WeakMap<Key, Value>> = new Subject<WeakMap<Key, Value>>();
	protected mutableMethods : string[] =
		[
			'set',
			'delete'
		];

	constructor(entries ?: Iterable<[Key, Value]>)
	{
		super(entries);
		this.init();
	}

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

	protected init() : void
	{
		this.store.next(this);
		this.mutableMethods.map(mutableMethod =>
		{
			this[mutableMethod] = (...args) =>
			{
				(super[mutableMethod] as Function).apply(this, args);
				this.store.next(this);
			};
		});
	}
}
