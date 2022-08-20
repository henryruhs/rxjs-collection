import { BehaviorSubject, Observable } from 'rxjs';

export class ReactiveWeakMap<Key extends object, Value> implements Pick<WeakMap<Key, Value>, 'has' | 'get' | 'set' | 'delete'>
{
	protected weakMap : BehaviorSubject<WeakMap<Key, Value>>;

	constructor(entries ?: Iterable<[Key, Value]>)
	{
		this.weakMap = new BehaviorSubject<WeakMap<Key, Value>>(new WeakMap<Key, Value>(entries));
	}

	has(key : Key) : boolean
	{
		return this.asWeakMap().has(key);
	}

	get(key : Key) : Value
	{
		return this.asWeakMap().get(key);
	}

	set(key : Key, value : Value) : WeakMap<Key, Value>
	{
		this.weakMap.next(this.asWeakMap().set(key, value));
		return this.asWeakMap();
	}

	delete(key : Key) : boolean
	{
		const weakMap : WeakMap<Key, Value> = this.asWeakMap();
		const status : boolean = weakMap.delete(key);

		this.weakMap.next(weakMap);
		return status;
	}

	asWeakMap() : WeakMap<Key, Value>
	{
		return this.weakMap.getValue();
	}

	asObservable() : Observable<WeakMap<Key, Value>>
	{
		return this.weakMap.asObservable();
	}
}
