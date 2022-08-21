import { BehaviorSubject, Subscription } from 'rxjs';

export class ReactiveMap<Key, Value> extends Map<Key, Value>
{
	protected store : BehaviorSubject<Map<Key, Value>> = new BehaviorSubject<Map<Key, Value>>(this);
	protected mutableMethods : string[] =
		[
			'set',
			'delete',
			'clear'
		];

	constructor(entries ?: Iterable<[Key, Value]>)
	{
		super(entries);
		this.init();
	}

	subscribe(next : (value : Map<Key, Value>) => void) : Subscription
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
