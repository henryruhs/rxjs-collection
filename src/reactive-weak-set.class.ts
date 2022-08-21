import { BehaviorSubject, Subscription } from 'rxjs';

export class ReactiveWeakSet<Type extends object> extends WeakSet<Type>
{
	protected store : BehaviorSubject<WeakSet<Type>> = new BehaviorSubject<WeakSet<Type>>(this);
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

	subscribe(next : (value : WeakSet<Type>) => void) : Subscription
	{
		return this.store.subscribe(next);
	}

	unsubscribe() : void
	{
		this.store.complete();
		this.store.unsubscribe();
	}

	protected init() : void
	{
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
