import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Request, RequestStatus } from '../models/request';

/**
 * Servicio para gestionar las solicitudes de servicios. Sustituye el
 * almacenamiento en memoria por llamadas al backend y mantiene un
 * `BehaviorSubject` para reaccionar a cambios en la lista.
 */
@Injectable({ providedIn: 'root' })
export class RequestsData {
  private readonly _list$ = new BehaviorSubject<Request[]>([]);
  readonly list$ = this._list$.asObservable();

  private readonly baseUrl = 'http://localhost:5000/api/requests';

  constructor(private http: HttpClient) {
    this.load();
  }

  /** Carga todas las solicitudes desde la API. Si el backend no está
   * disponible, se inicializa una lista vacía. */
  load() {
    this.http.get<Request[]>(this.baseUrl).subscribe({
      next: list => this._list$.next(list),
      error: () => {
        // si no hay backend cargamos una lista vacía para empezar
        this._list$.next([]);
      }
    });
  }

  /**
   * Registra una nueva solicitud. Por simplicidad asignamos un
   * usuario fijo (1) y estado inicial PENDIENTE. La fecha la
   * establece el backend.
   */
  create(details: string, serviceId: number) {
    const payload = {
      userId: 1,
      serviceId,
      details,
      status: 'PENDIENTE' as RequestStatus
    };
    this.http.post<Request>(this.baseUrl, payload).subscribe({
      next: () => this.load(),
      error: () => {
        // crear solicitud localmente cuando no hay backend
        const id = Date.now();
        const now = new Date().toISOString();
        const newItem: Request = {
          id,
          userId: payload.userId,
          serviceId: payload.serviceId,
          requestDate: now,
          status: payload.status,
          details: payload.details
        };
        this._list$.next([...this._list$.value, newItem]);
      }
    });
  }

  /** Elimina una solicitud por su identificador. */
  remove(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => this.load(),
      error: () => {
        this._list$.next(this._list$.value.filter(r => r.id !== id));
      }
    });
  }
}