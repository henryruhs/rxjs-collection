import { FunctionWithStore } from './reactive.interface';

export function reactive(Reactive : Function, Base : Function, methods : string[]) : void
{
	methods.map(method =>
	{
		(Reactive as FunctionConstructor).prototype[method] = function(...args : string[])
		{
			((Base as FunctionConstructor).prototype[method] as Function).apply(this, args);
			(this as FunctionWithStore).store?.next(this);
		};
	});
}

export function hyperactive<Collection extends object>(collection : Collection) : Collection
{
	return new Proxy(collection,
	{
		defineProperty(that : Collection, property : string | symbol, value : unknown)
		{
			const action : boolean = Reflect.defineProperty(that, property, value);

			(that as FunctionWithStore).store?.next(that as Function);
			return action;
		},
		deleteProperty(that : Collection, property : string | symbol) : boolean
		{
			const action : boolean = Reflect.deleteProperty(that, property);

			(that as FunctionWithStore).store?.next(that as Function);
			return action;
		}
	});
}
