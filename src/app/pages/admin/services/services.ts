import { Component, signal, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../../core/services/services-data';
import { CategoriesData } from '../../../core/services/categories-data';
import { Service, ServiceStatus } from '../../../core/models/service';
import { Category } from '../../../core/models/category';

@Component({
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  template: `
<h1 class="h3 mb-3">Administración de servicios</h1>

<!-- Formulario de filtros y búsqueda -->
<form class="row g-2 mb-3">
  <div class="col-md-4">
    <input type="text" class="form-control" [(ngModel)]="search" name="search" placeholder="Buscar servicio...">
  </div>
  <div class="col-md-3">
    <select class="form-select" [(ngModel)]="categoryFilter" name="categoryFilter">
      <option value="">Categoría</option>
      <option *ngFor="let c of categories()" [ngValue]="c.id">{{c.name}}</option>
    </select>
  </div>
  <div class="col-md-3">
    <select class="form-select" [(ngModel)]="statusFilter" name="statusFilter">
      <option value="">Estado</option>
      <option value="ACTIVO">Activo</option>
      <option value="PLANIFICADO">Planificado</option>
      <option value="RETIRADO">Retirado</option>
    </select>
  </div>
  <div class="col-md-2 text-end">
    <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#svcModal" (click)="new()">Crear servicio</button>
  </div>
</form>

<div class="table-responsive">
  <table class="table align-middle">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>SLA</th>
        <th>Estado</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let s of filtered()">
        <td>{{ s.name }}</td>
        <td>{{ s.category?.name || '—' }}</td>
        <td>{{ s.sla }}</td>
        <td>
          <span class="badge"
            [class.text-bg-success]="s.status === 'ACTIVO'"
            [class.text-bg-warning]="s.status === 'PLANIFICADO'"
            [class.text-bg-secondary]="s.status === 'RETIRADO'">
            {{ s.status }}
          </span>
        </td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#svcModal" (click)="edit(s)">Editar</button>
          <button class="btn btn-sm btn-outline-danger" (click)="remove(s.id)">Eliminar</button>
        </td>
      </tr>
      <tr *ngIf="filtered().length === 0">
        <td colspan="5" class="text-center text-muted">No hay servicios registrados.</td>
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
          <h5 class="modal-title">{{ editing()?.id ? 'Editar' : 'Crear' }} servicio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre</label>
            <input class="form-control" [(ngModel)]="form.name" name="name" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Categoría</label>
            <select class="form-select" [(ngModel)]="form.categoryId" name="categoryId" required>
              <option [ngValue]="null" disabled selected>Selecciona una categoría</option>
              <option *ngFor="let c of categories()" [ngValue]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">SLA</label>
            <input class="form-control" [(ngModel)]="form.sla" name="sla" placeholder="Ej. 24h respuesta" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Estado</label>
            <select class="form-select" [(ngModel)]="form.status" name="status" required>
              <option value="ACTIVO">Activo</option>
              <option value="PLANIFICADO">Planificado</option>
              <option value="RETIRADO">Retirado</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" rows="3" [(ngModel)]="form.description" name="description" required></textarea>
          </div>
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
  categories = signal<Category[]>([]);
  editing = signal<Service | null>(null);

  /**
   * Filtros para búsqueda, categoría y estado. Estos se vinculan al
   * formulario de la plantilla para filtrar los servicios listados.
   */
  search = '';
  categoryFilter: number | '' = '';
  statusFilter: ServiceStatus | '' = '';

  // Formulario con campos acordes al nuevo modelo. Se omiten los campos
  // opcionales como createdBy y createdAt ya que los asigna el backend.
  form: {
    id?: number;
    name: string;
    description: string;
    categoryId: number | null;
    sla: string;
    status: ServiceStatus;
  } = { id: undefined, name: '', description: '', categoryId: null, sla: '', status: 'ACTIVO' };

  constructor(private ds: ServicesData, private cats: CategoriesData) {
    ds.list$.subscribe(this.list.set);
    cats.list$.subscribe(this.categories.set);
  }

  /** Lista filtrada en función de los criterios de búsqueda. */
  filtered = computed(() => {
    return this.list().filter(s => {
      const matchesCategory = !this.categoryFilter || s.categoryId === this.categoryFilter;
      const matchesStatus = !this.statusFilter || s.status === this.statusFilter;
      const matchesSearch = !this.search || s.name.toLowerCase().includes(this.search.toLowerCase()) || s.description.toLowerCase().includes(this.search.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  });

  new() {
    this.editing.set(null);
    this.form = { id: undefined, name: '', description: '', categoryId: null, sla: '', status: 'ACTIVO' };
  }
  edit(s: Service) {
    this.editing.set(s);
    this.form = {
      id: s.id,
      name: s.name,
      description: s.description,
      categoryId: s.categoryId ?? null,
      sla: s.sla,
      status: s.status
    };
  }
  save() {
    // Validar campos obligatorios y garantizar que categoryId sea un número
    if (this.form.categoryId == null || !this.form.name || !this.form.description || !this.form.sla) return;
    // Construir el payload asegurando que categoryId sea de tipo number
    const payload = {
      name: this.form.name,
      description: this.form.description,
      categoryId: Number(this.form.categoryId),
      sla: this.form.sla,
      status: this.form.status
    };
    if (this.editing()) {
      const id = this.form.id;
      if (id == null) return;
      this.ds.update({ id, ...payload });
    } else {
      this.ds.create(payload);
    }
    (window as any).bootstrap?.Modal.getInstance(document.getElementById('svcModal')!)?.hide();
  }
  remove(id: number) {
    this.ds.remove(id);
  }
}
