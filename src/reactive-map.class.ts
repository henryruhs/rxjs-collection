import { Subject, Subscription } from 'rxjs';

export class ReactiveMap<Key, Value> extends Map<Key, Value>
{
	protected store : Subject<Map<Key, Value>> = new Subject<Map<Key, Value>>();
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
