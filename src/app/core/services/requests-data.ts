import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Request } from '../models/request';

/**
 * A lightweight in-memory store for service requests. The
 * `BehaviorSubject` makes it easy to subscribe to changes and
 * populate lists in the admin interface. When backend support is
 * introduced, this service can be refactored to perform HTTP
 * requests against an API while maintaining a consistent API
 * surface.
 */
@Injectable({ providedIn: 'root' })
export class RequestsData {
  private readonly _list$ = new BehaviorSubject<Request[]>([]);
  /**
   * Observable that emits the current list of requests. Components
   * can subscribe to this to reactively update their view.
   */
  readonly list$ = this._list$.asObservable();

  /**
   * Create a new request in memory. A unique id and timestamp are
   * generated automatically. Returns the created request.
   */
  create(nombre: string, email: string, descripcion: string, serviceId: number) {
    const req: Request = {
      id: Date.now(),
      nombre,
      email,
      descripcion,
      serviceId,
      createdAt: new Date()
    };
    this._list$.next([...this._list$.value, req]);
    return req;
  }

  /**
   * Remove a request by its id. Useful for admin interfaces when
   * marking a request as processed.
   */
  remove(id: number) {
    this._list$.next(this._list$.value.filter(r => r.id !== id));
  }
}