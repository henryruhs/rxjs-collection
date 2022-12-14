import { Observable, Subject, Subscription } from 'rxjs';

export interface ReactiveCollection<Collection>
{
	asObservable() : Observable<Collection>;
	subscribe(next : (value : Collection) => void) : Subscription;
	unsubscribe() : void;
}

export interface FunctionWithStore extends Function
{
	store : Subject<Function>
}
