import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Service } from '../../core/models/service';

/**
 * ServicesData encapsula la lógica de acceso al backend REST que
 * expone el catálogo de servicios. Anteriormente esta clase
 * consumía un JSON estático desde `assets/services.json`. En esta
 * versión se conecta a la API ASP.NET Core desplegada en
 * http://localhost:5000/api. La conversión entre los nombres de
 * campo del backend (snake_case en español) y el modelo de la
 * aplicación Angular se realiza mediante las funciones `fromApi`
 * y `toApi` definidas más abajo.
 */

@Injectable({ providedIn: 'root' })
export class ServicesData{
  private readonly _list$ = new BehaviorSubject<Service[]>([]);
  /**
   * Observable que emite la lista actual de servicios. Todos los
   * componentes suscritos reaccionan automáticamente a las
   * actualizaciones después de las operaciones CRUD.
   */
  readonly list$ = this._list$.asObservable();

  /**
   * URL base de la API para los servicios. De forma predeterminada
   * apunta a un backend local en el puerto 5000. Si se despliega la
   * API en otro host o puerto este valor puede modificarse aquí
   * fácilmente.
   */
  private readonly apiBase = 'http://localhost:5000/api/services';

  constructor(private http: HttpClient) {
    this.load();
  }

  /**
   * Carga la lista de servicios desde el backend REST y actualiza
   * el BehaviorSubject interno. La conversión de formato se
   * realiza mediante `fromApi` para adaptar los nombres de
   * propiedades.
   */
  load() {
    this.http.get<any[]>(this.apiBase).subscribe(
      (data) => {
        const list = data.map((obj) => this.fromApi(obj));
        this._list$.next(list);
      },
      (err) => {
        console.error('Error cargando servicios', err);
      }
    );
  }

  /**
   * Devuelve un observable del servicio con el identificador dado.
   * Si la lista aún no se ha cargado puede devolver undefined
   * inicialmente, pero se actualizará en cuanto lleguen los datos.
   */
  getById(id: number) {
    return this.list$.pipe(map((list) => list.find((s) => s.id === id)));
  }

  /**
   * Crea un nuevo servicio en el backend. Convierte el modelo
   * interno a la estructura aceptada por la API antes de enviar
   * la solicitud. Al completarse la operación se vuelve a
   * sincronizar la lista local.
   */
  create(item: Service) {
    const body = this.toApi(item);
    this.http.post<any>(this.apiBase, body).subscribe(
      (res) => {
        // Normaliza la respuesta de la API y actualiza la lista
        const nuevo = this.fromApi(res);
        this._list$.next([...this._list$.value, nuevo]);
      },
      (err) => console.error('Error creando servicio', err)
    );
  }

  /**
   * Actualiza un servicio existente en el backend. Tras la
   * actualización sincroniza el listado local reemplazando el
   * elemento actualizado.
   */
  update(item: Service) {
    const body = this.toApi(item);
    this.http.put<any>(`${this.apiBase}/${item.id}`, body).subscribe(
      (res) => {
        const actualizado = this.fromApi(res);
        const list = this._list$.value.map((s) => (s.id === actualizado.id ? actualizado : s));
        this._list$.next(list);
      },
      (err) => console.error('Error actualizando servicio', err)
    );
  }

  /**
   * Elimina un servicio de la base de datos mediante una
   * solicitud DELETE al backend. La lista local se actualiza
   * eliminando el elemento correspondiente al identificador.
   */
  remove(id: number) {
    this.http.delete(`${this.apiBase}/${id}`).subscribe(
      () => {
        this._list$.next(this._list$.value.filter((s) => s.id !== id));
      },
      (err) => console.error('Error eliminando servicio', err)
    );
  }

  /**
   * Convierte un objeto proveniente de la API REST (snake_case,
   * nombres en español) a la interfaz Service utilizada en la
   * aplicación Angular. Ajusta valores predeterminados cuando
   * ciertos campos no están presentes.
   */
  private fromApi(obj: any): Service {
    return {
      id: obj.id,
      nombre: obj.nombre,
      categoria: obj.necesidad || '',
      nivel: (obj.ansNivel as any) || 'Bronce',
      responsable: obj.equipo || '',
      descripcion: obj.descripcion,
      ans: obj.tiempoHabil || '',
      estado: obj.estado && obj.estado.toUpperCase() === 'ACTIVO' ? 'Activo' : 'Inactivo',
      horario: obj.horario || '',
      tipoSolicitud: obj.tipoSolicitud || undefined
    };
  }

  /**
   * Convierte un objeto Service de la aplicación Angular a la
   * estructura esperada por la API ASP.NET Core. Se generan
   * códigos automáticos basados en el nombre y la fecha cuando no
   * se ha definido un identificador único. El estado se envía en
   * mayúsculas para coincidir con los posibles valores de la API.
   */
  private toApi(item: Service): any {
    const codigoBase = item.nombre
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_')
      .slice(0, 16);
    return {
      id: item.id,
      codigo: item.id ? `SVC_${item.id}` : `SVC_${Date.now()}`,
      nombre: item.nombre,
      descripcion: item.descripcion,
      equipo: item.responsable || null,
      necesidad: item.categoria || null,
      horario: item.horario || null,
      ansNivel: item.nivel || null,
      tiempoHabil: item.ans || null,
      tipoSolicitud: item.tipoSolicitud || null,
      estado: item.estado ? item.estado.toUpperCase() : 'ACTIVO'
    };
  }
}
