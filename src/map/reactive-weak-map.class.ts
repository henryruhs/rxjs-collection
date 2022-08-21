import { BehaviorSubject, Subscription } from 'rxjs';

export class ReactiveWeakMap<Key extends object, Value> extends WeakMap<Key, Value>
{
	protected store : BehaviorSubject<WeakMap<Key, Value>> = new BehaviorSubject<WeakMap<Key, Value>>(this);
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

	subscribe(next : (value : WeakMap<Key, Value>) => void) : Subscription
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
