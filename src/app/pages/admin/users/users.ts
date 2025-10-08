import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersData } from '../../../core/services/users-data';
import { User } from '../../../core/models/user';

/**
 * Gestión de usuarios y roles. Este módulo permite listar,
 * crear, editar y eliminar usuarios en la aplicación. Por ahora
 * opera en memoria; en futuras versiones se integrará con el
 * backend y permitirá asignar roles y permisos.
 */
@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
<h1 class="h3 mb-3">Gestión de usuarios y roles</h1>

<!-- Formulario de creación/edición -->
<form class="row g-2 align-items-end mb-3" (ngSubmit)="save()">
  <div class="col-md-4">
    <input class="form-control" [(ngModel)]="form.username" name="username" placeholder="Nombre de usuario" required>
  </div>
  <div class="col-md-3">
    <select class="form-select" [(ngModel)]="form.roleId" name="roleId" required>
      <option [ngValue]="1">Administrador</option>
      <option [ngValue]="2">Coordinador OTIC</option>
      <option [ngValue]="3">Usuario final</option>
    </select>
  </div>
  <div class="col-md-2">
    <button class="btn btn-primary w-100">{{ editing() ? 'Actualizar' : 'Crear' }}</button>
  </div>
  <div class="col-md-3" *ngIf="editing()">
    <button type="button" class="btn btn-secondary w-100" (click)="cancelEdit()">Cancelar</button>
  </div>
</form>

<!-- Tabla de usuarios -->
<div class="table-responsive">
  <table class="table align-middle">
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Rol</th>
        <th class="text-end">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let u of users()">
        <td>{{ u.id }}</td>
        <td>{{ u.username }}</td>
        <td>{{ roleLabel(u.roleId) }}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary me-2" (click)="edit(u)">Editar</button>
          <button class="btn btn-sm btn-outline-danger" (click)="remove(u.id)">Eliminar</button>
        </td>
      </tr>
      <tr *ngIf="users().length === 0">
        <td colspan="4" class="text-center text-muted">No hay usuarios registrados.</td>
      </tr>
    </tbody>
  </table>
</div>
  `
})
export class UsersAdmin {
  users = signal<User[]>([]);
  editing = signal<User | null>(null);
  form: User = { id: 0, username: '', roleId: 3 };

  constructor(private usersData: UsersData) {
    usersData.list$.subscribe(list => this.users.set(list));
  }

  /** Obtiene la etiqueta amigable para un rol. */
  roleLabel(roleId: number): string {
    switch (roleId) {
      case 1: return 'Administrador';
      case 2: return 'Coordinador OTIC';
      case 3: return 'Usuario final';
      default: return '—';
    }
  }

  /** Inicia la creación de un usuario. */
  new() {
    this.editing.set(null);
    this.form = { id: 0, username: '', roleId: 3 };
  }

  /** Selecciona un usuario para edición. */
  edit(u: User) {
    this.editing.set(u);
    this.form = { ...u };
  }

  /** Cancela la edición y restablece el formulario. */
  cancelEdit() {
    this.new();
  }

  /** Crea o actualiza un usuario. */
  save() {
    if (!this.form.username) return;
    if (this.editing()) {
      this.usersData.update(this.form);
    } else {
      const newUser: User = { ...this.form, id: Date.now() };
      this.usersData.create(newUser);
    }
    this.new();
  }

  /** Elimina un usuario. */
  remove(id: number) {
    this.usersData.remove(id);
  }
}