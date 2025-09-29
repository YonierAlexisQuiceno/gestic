import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth{
  private readonly _loggedIn$ = new BehaviorSubject<boolean>(false);
  readonly loggedIn$ = this._loggedIn$.asObservable();

  login(username: string, password: string) {
    // mock: acepta cualquier cosa no vacía
    const ok = !!username && !!password;
    this._loggedIn$.next(ok);
    return ok;
  }
  logout() { this._loggedIn$.next(false); }
  get isLoggedIn() { return this._loggedIn$.value; }
}
