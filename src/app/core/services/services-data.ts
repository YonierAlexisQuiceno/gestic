import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Service } from '../../core/models/service';

@Injectable({ providedIn: 'root' })
export class ServicesData{
  private readonly _list$ = new BehaviorSubject<Service[]>([]);
  readonly list$ = this._list$.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<Service[]>('/assets/services.json').subscribe(d => this._list$.next(d));
  }

  getById(id: number) {
    return this.list$.pipe(map(list => list.find(s => s.id === id)));
  }

  // Mock CRUD (solo front): actualiza BehaviorSubject
  create(item: Service) {
    const list = [...this._list$.value, item];
    this._list$.next(list);
  }
  update(item: Service) {
    const list = this._list$.value.map(s => (s.id === item.id ? item : s));
    this._list$.next(list);
  }
  remove(id: number) {
    this._list$.next(this._list$.value.filter(s => s.id !== id));
  }
}
