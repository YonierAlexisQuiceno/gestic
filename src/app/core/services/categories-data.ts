import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';

/**
 * Servicio encargado de cargar y exponer la lista de categorías
 * disponibles en el catálogo. Las categorías se obtienen del
 * backend y se mantienen en un `BehaviorSubject` para que los
 * componentes puedan suscribirse y reaccionar a cambios.
 */
@Injectable({ providedIn: 'root' })
export class CategoriesData {
  private readonly _list$ = new BehaviorSubject<Category[]>([]);
  readonly list$ = this._list$.asObservable();

  // Dirección base de la API para categorías. Se podría extraer a
  // una configuración global si se repite en varios servicios.
  private readonly baseUrl = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) {
    this.load();
  }

  /** Carga todas las categorías desde el backend y actualiza la lista. Si el
   * backend no devuelve datos o falla, se cargan categorías de ejemplo
   * incluidas en assets. */
  load() {
    this.http.get<Category[]>(this.baseUrl).subscribe({
      next: list => {
        if (Array.isArray(list) && list.length > 0) {
          this._list$.next(list);
        } else {
          this.loadFallback();
        }
      },
      error: () => this.loadFallback()
    });
  }

  /** Carga las categorías de ejemplo incluidas en assets si el backend falla. */
  private loadFallback() {
    this.http.get<Category[]>('assets/sample-categories.json').subscribe(list => this._list$.next(list));
  }
}