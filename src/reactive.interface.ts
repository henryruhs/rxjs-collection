import { Observable, Subscription } from 'rxjs';

export interface ReactiveCollection<Collection>
{
	asObservable() : Observable<Collection>;
	subscribe(next : (value : Collection) => void) : Subscription;
	unsubscribe() : void;
}
