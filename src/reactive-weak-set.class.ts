import { Observable, Subject, Subscription } from 'rxjs';

export class ReactiveWeakSet<Type extends object> extends WeakSet<Type>
{
	protected store : Subject<WeakSet<Type>> = new Subject<WeakSet<Type>>();
	protected mutableMethods : string[] =
		[
			'add',
			'delete'
		];

	constructor(entries ?: Iterable<Type>)
	{
		super(entries);
		this.init();
	}

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
