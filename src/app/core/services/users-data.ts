import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

/**
 * Servicio de gestión de usuarios para la versión MVP de Gestic.
 * Mantiene una lista de usuarios en memoria para fines de
 * demostración. En una implementación completa este servicio se
 * conectaría a un backend que persistiera la información.
 */
@Injectable({ providedIn: 'root' })
export class UsersData {
  // Lista inicial con algunos usuarios de ejemplo. Los roles se
  // corresponden con: 1=Administrador, 2=Coordinador OTIC, 3=Usuario final.
  private readonly _list$ = new BehaviorSubject<User[]>([
    { id: 1, username: 'admin', roleId: 1 },
    { id: 2, username: 'coordinador', roleId: 2 },
    { id: 3, username: 'usuario', roleId: 3 }
  ]);

  readonly list$ = this._list$.asObservable();

  /** Crea un usuario nuevo en memoria. */
  create(user: User) {
    this._list$.next([...this._list$.value, user]);
  }

  /** Actualiza un usuario existente por id. */
  update(user: User) {
    this._list$.next(this._list$.value.map(u => u.id === user.id ? user : u));
  }

  /** Elimina un usuario por su id. */
  remove(id: number) {
    this._list$.next(this._list$.value.filter(u => u.id !== id));
  }
}