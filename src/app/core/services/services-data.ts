import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../models/service';

/**
 * Servicio para gestionar los servicios a través de la API. Carga
 * inicialmente todos los servicios y expone un observable para
 * consumirlos en los componentes. Proporciona métodos CRUD que
 * actualizan la lista al completarse las operaciones.
 */
@Injectable({ providedIn: 'root' })
export class ServicesData {
  private readonly _list$ = new BehaviorSubject<Service[]>([]);
  readonly list$ = this._list$.asObservable();

  private readonly baseUrl = 'http://localhost:5000/api/services';

  constructor(private http: HttpClient) {
    // Cargar servicios al iniciar el servicio.
    this.load();
  }

  /**
   * Obtiene la lista de servicios. Si la API responde correctamente y
   * devuelve una lista no vacía, se utiliza esa lista. En caso de
   * error (por ejemplo, si el backend no está disponible) o de que la
   * lista devuelta esté vacía, se carga un conjunto de datos de
   * ejemplo desde la carpeta de assets. Esto permite que la
   * aplicación se muestre con contenido de referencia incluso sin
   * conexión al backend.
   */
  load() {
    this.http.get<Service[]>(this.baseUrl).subscribe({
      next: list => {
        if (Array.isArray(list) && list.length > 0) {
          this._list$.next(list);
        } else {
          this.loadFallback();
        }
      },
      error: () => {
        this.loadFallback();
      }
    });
  }

  /** Carga los servicios de ejemplo incluidos en assets. */
  private loadFallback() {
    this.http.get<Service[]>('assets/sample-services.json').subscribe(list => this._list$.next(list));
  }

  /** Obtiene un servicio concreto por su identificador. */
  getById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo servicio en el backend. Si la llamada falla o no
   * existe backend, el servicio se añade directamente a la lista en
   * memoria asignando un id único basado en la fecha. Tras la
   * operación se recarga la lista.
   */
  create(item: Omit<Service, 'id' | 'category' | 'createdAt'>) {
    return this.http.post<Service>(this.baseUrl, item).subscribe({
      next: () => this.load(),
      error: () => {
        const current = this._list$.value;
        const newItem = { ...item, id: Date.now() } as Service;
        this._list$.next([...current, newItem]);
      }
    });
  }

  /**
   * Actualiza un servicio existente. Intenta persistir el cambio en
   * el backend. Si la llamada falla, actualiza la copia local.
   */
  update(item: Omit<Service, 'category' | 'createdAt'>) {
    return this.http.put<Service>(`${this.baseUrl}/${item.id}`, item).subscribe({
      next: () => this.load(),
      error: () => {
        const current = this._list$.value.map(s => s.id === item.id ? { ...s, ...item } as Service : s);
        this._list$.next(current);
      }
    });
  }

  /**
   * Elimina un servicio por su identificador. Intenta borrar en el
   * backend. Si la llamada falla se elimina localmente.
   */
  remove(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => this.load(),
      error: () => {
        this._list$.next(this._list$.value.filter(s => s.id !== id));
      }
    });
  }
}
