import { BehaviorSubject, Observable } from 'rxjs';

export class ReactiveMap<Key, Value> implements Pick<Map<Key, Value>, 'size' | 'has' | 'get' | 'set' | 'delete' | 'clear' | 'forEach' | 'entries' | 'keys' | 'values'>
{
	protected map : BehaviorSubject<Map<Key, Value>>;

	constructor(entries ?: Iterable<[Key, Value]>)
	{
		this.map = new BehaviorSubject<Map<Key, Value>>(new Map<Key, Value>(entries));
	}

	get size() : number
	{
		return this.asMap().size;
	}

	has(key : Key) : boolean
	{
		return this.asMap().has(key);
	}

	get(key : Key) : Value
	{
		return this.asMap().get(key);
	}

	set(key : Key, value : Value) : Map<Key, Value>
	{
		this.map.next(this.asMap().set(key, value));
		return this.asMap();
	}

	delete(key : Key) : boolean
	{
		const map : Map<Key, Value> = this.asMap();
		const status : boolean = map.delete(key);

		this.map.next(map);
		return status;
	}

	clear() : void
	{
		const map : Map<Key, Value> = this.asMap();

		map.clear();
		this.map.next(map);
	}

	forEach(callback : (value : Value, key : Key, map : Map<Key, Value>) => void) : void
	{
		this.asMap().forEach(callback);
	}

	entries() : IterableIterator<[Key, Value]>
	{
		return this.asMap().entries();
	}

	keys() : IterableIterator<Key>
	{
		return this.asMap().keys();
	}

	values() : IterableIterator<Value>
	{
		return this.asMap().values();
	}

	asMap() : Map<Key, Value>
	{
		return this.map.getValue();
	}

	asObservable() : Observable<Map<Key, Value>>
	{
		return this.map.asObservable();
	}
}
