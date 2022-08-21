import { BehaviorSubject, Subscription } from 'rxjs';

export class ReactiveSet<Type> extends Set<Type>
{
	protected store : BehaviorSubject<Set<Type>> = new BehaviorSubject<Set<Type>>(this);
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

	subscribe(next : (value : Set<Type>) => void) : Subscription
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
