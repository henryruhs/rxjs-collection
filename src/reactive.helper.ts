import { Subject } from 'rxjs';

export function reactivate(Reactive : Function, Base : Function, methods : string[]) : void
{
	methods.map(method =>
	{
		(Reactive as FunctionConstructor).prototype[method] = function(...args : string[])
		{
			((Base as FunctionConstructor).prototype[method] as Function).apply(this, args);
			(this as { store : Subject<Function>}).store?.next(this);
		};
	});
}
