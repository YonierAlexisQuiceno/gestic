import { Component, signal, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../../core/services/services-data';
import { Service } from '../../../core/models/service';

@Component({
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
<h1 class="h3 mb-3">Administración de servicios</h1>

<div class="d-flex justify-content-end mb-2">
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#svcModal" (click)="new()">Nuevo servicio</button>
</div>

<div class="table-responsive">
<table class="table align-middle">
  <thead>
    <tr>
      <th>Nombre</th><th>Categoría</th><th>Estado</th><th></th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let s of list()">
      <td>{{s.nombre}}</td>
      <td>{{s.categoria}}</td>
      <td>
        <span class="badge" [class.text-bg-success]="s.estado==='Activo'" [class.text-bg-secondary]="s.estado==='Inactivo'">{{s.estado}}</span>
      </td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#svcModal" (click)="edit(s)">Editar</button>
        <button class="btn btn-sm btn-outline-danger" (click)="remove(s.id)">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>
</div>

<!-- Modal creación/edición -->
<div class="modal fade" id="svcModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <form (ngSubmit)="save()">
        <div class="modal-header">
          <h5 class="modal-title">{{editing()?.id ? 'Editar' : 'Nuevo'}} servicio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body row g-3">
          <div class="col-md-6"><label class="form-label">Nombre</label>
            <input class="form-control" [(ngModel)]="form.nombre" name="nombre" required></div>
          <div class="col-md-6"><label class="form-label">Categoría</label>
            <input class="form-control" [(ngModel)]="form.categoria" name="categoria" required></div>
          <div class="col-md-6"><label class="form-label">Nivel</label>
            <select class="form-select" [(ngModel)]="form.nivel" name="nivel" required>
              <option>Bronce</option><option>Plata</option><option>Oro</option>
            </select></div>
          <div class="col-md-6"><label class="form-label">Responsable</label>
            <input class="form-control" [(ngModel)]="form.responsable" name="responsable" required></div>
          <div class="col-12"><label class="form-label">Descripción</label>
            <textarea class="form-control" rows="3" [(ngModel)]="form.descripcion" name="descripcion" required></textarea></div>
          <div class="col-md-6"><label class="form-label">ANS</label>
            <input class="form-control" [(ngModel)]="form.ans" name="ans"></div>
          <div class="col-md-6"><label class="form-label">Estado</label>
            <select class="form-select" [(ngModel)]="form.estado" name="estado" required>
              <option>Activo</option><option>Inactivo</option>
            </select></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</div>
  `
})
export class Services {
  list = signal<Service[]>([]);
  editing = signal<Service | null>(null);

  form: Service = { id: 0, nombre: '', categoria: '', nivel: 'Bronce', responsable: '', descripcion: '', estado: 'Activo', ans: '' };

  constructor(private ds: ServicesData) {
    ds.list$.subscribe(this.list.set);
  }

  new() {
    this.editing.set(null);
    this.form = { id: Date.now(), nombre: '', categoria: '', nivel: 'Bronce', responsable: '', descripcion: '', estado: 'Activo', ans: '' };
  }
  edit(s: Service) {
    this.editing.set(s);
    this.form = { ...s };
  }
  save() {
    if (this.editing()) this.ds.update(this.form);
    else this.ds.create(this.form);
    (window as any).bootstrap?.Modal.getInstance(document.getElementById('svcModal')!)?.hide();
  }
  remove(id: number) { this.ds.remove(id); }
}
