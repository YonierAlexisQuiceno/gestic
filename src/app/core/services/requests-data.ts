import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Request } from '../models/request';
import { HttpClient } from '@angular/common/http';

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
   * Observable que emite la lista de solicitudes vigentes. Los
   * componentes administrativos pueden suscribirse para
   * sincronizar su interfaz en tiempo real.
   */
  readonly list$ = this._list$.asObservable();

  /**
   * URL base de la API para las solicitudes. Ajusta este valor si
   * el backend se encuentra en otra ruta o puerto.
   */
  private readonly apiBase = 'http://localhost:5000/api/solicitudes';

  constructor(private http: HttpClient) {
    this.load();
  }

  /**
   * Carga todas las solicitudes desde el backend y actualiza la lista
   * local. Si ocurre un error se mantendrá la lista actual y se
   * imprimirá en consola para depuración.
   */
  load() {
    this.http.get<any[]>(this.apiBase).subscribe(
      (data) => {
        const list = data.map((obj) => this.fromApi(obj));
        this._list$.next(list);
      },
      (err) => console.error('Error cargando solicitudes', err)
    );
  }

  /**
   * Crea una nueva solicitud asociada a un servicio. Envia la
   * información al backend y, al completar, agrega la nueva
   * solicitud a la lista local. Retorna una promesa que resuelve
   * con la solicitud normalizada para permitir un manejo
   * asíncrono desde los componentes.
   */
  create(nombre: string, email: string, descripcion: string, serviceId: number) {
    const body = {
      servicioId: serviceId,
      nombre,
      email,
      descripcion,
      estado: 'pendiente'
    };
    return this.http.post<any>(this.apiBase, body).subscribe(
      (res) => {
        const req = this.fromApi(res);
        this._list$.next([...this._list$.value, req]);
      },
      (err) => console.error('Error creando solicitud', err)
    );
  }

  /**
   * Elimina una solicitud del backend y de la lista local. Si la
   * operación falla se notifica por consola.
   */
  remove(id: number) {
    this.http.delete(`${this.apiBase}/${id}`).subscribe(
      () => {
        this._list$.next(this._list$.value.filter((r) => r.id !== id));
      },
      (err) => console.error('Error eliminando solicitud', err)
    );
  }

  /**
   * Convierte un objeto recibido del backend a la interfaz
   * Request utilizada en la aplicación. La API usa nombres
   * servicioId y createdAt, se normalizan a serviceId y Date.
   */
  private fromApi(obj: any): Request {
    return {
      id: obj.id,
      nombre: obj.nombre,
      email: obj.email,
      descripcion: obj.descripcion,
      serviceId: obj.servicioId,
      createdAt: obj.createdAt ? new Date(obj.createdAt) : new Date()
    };
  }
}