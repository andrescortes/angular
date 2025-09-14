import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private readonly _progress$ = new BehaviorSubject<number>(0);

  setProgress(percent: number): void {
    this._progress$.next(percent);
  }

  reset(): void {
    this._progress$.next(0);
  }

  get progress(): Observable<number> {
    return this._progress$.asObservable();
  }
}
