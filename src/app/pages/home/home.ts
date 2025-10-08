import { Component, signal, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicesData } from '../../core/services/services-data';
import { Service, ServiceStatus } from '../../core/models/service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, FormsModule, RouterLink],
  template: `
<h1 class="h3 mb-3">Catálogo de servicios TIC</h1>

<form class="row g-2 align-items-end mb-3">
  <div class="col-12 col-md-4">
    <label class="form-label">Categoría</label>
    <select class="form-select" [(ngModel)]="categoryFilter" name="category">
      <option value="">Todas</option>
      <option *ngFor="let c of categories()" [value]="c.id">{{c.name}}</option>
    </select>
  </div>
  <div class="col-12 col-md-4">
    <label class="form-label">Estado</label>
    <select class="form-select" [(ngModel)]="statusFilter" name="status">
      <option value="">Todos</option>
      <option value="ACTIVO">Activo</option>
      <option value="PLANIFICADO">Planificado</option>
      <option value="RETIRADO">Retirado</option>
    </select>
  </div>
  <div class="col-12 col-md-4">
    <label class="form-label">Buscar</label>
    <input class="form-control" [(ngModel)]="search" name="search" placeholder="Nombre o descripción">
  </div>
</form>

<div class="row row-cols-1 row-cols-md-3 g-3">
  <div class="col" *ngFor="let s of filtered()">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h2 class="h5 card-title">{{s.name}}</h2>
        <p class="card-text small text-muted mb-2">{{s.category?.name}} • {{s.sla}}</p>
        <p class="card-text flex-grow-1">{{s.description}}</p>
      </div>
      <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
        <span class="badge"
          [class.text-bg-success]="s.status==='ACTIVO'"
          [class.text-bg-warning]="s.status==='PLANIFICADO'"
          [class.text-bg-secondary]="s.status==='RETIRADO'">
          {{s.status}}
        </span>
        <a [routerLink]="['/service', s.id]" class="btn btn-sm btn-primary">Ver detalle</a>
      </div>
    </div>
  </div>
</div>
  `
})
export class Home {
  // filtros
  categoryFilter: number | '' = '';
  statusFilter: ServiceStatus | '' = '';
  search = '';

  list = signal<Service[]>([]);

  constructor(ds: ServicesData) {
    ds.list$.subscribe(this.list.set);
  }

  // Devuelve las categorías únicas ordenadas a partir de los servicios
  categories = computed(() => {
    const mapa = new Map<number, { id: number; name: string }>();
    for (const s of this.list()) {
      if (s.category) mapa.set(s.category.id, { id: s.category.id, name: s.category.name });
    }
    return Array.from(mapa.values());
  });

  // Lista filtrada según los criterios seleccionados
  filtered = computed(() => {
    return this.list().filter(s => {
      const matchesCategory = !this.categoryFilter || s.categoryId === this.categoryFilter;
      const matchesStatus = !this.statusFilter || s.status === this.statusFilter;
      const matchesSearch = !this.search || s.name.toLowerCase().includes(this.search.toLowerCase()) || s.description.toLowerCase().includes(this.search.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  });
}
