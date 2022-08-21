import { Observable, Subject, Subscription } from 'rxjs';

export class ReactiveSet<Type> extends Set<Type>
{
	protected store : Subject<Set<Type>> = new Subject<Set<Type>>();
	protected mutableMethods : string[] =
		[
			'add',
			'delete',
			'clear'
		];

	constructor(entries ?: Iterable<Type>)
	{
		super(entries);
		this.init();
	}

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
