import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicesData } from '../../core/services/services-data';
import { Service } from '../../core/models/service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, FormsModule, RouterLink],
  template: `
<h1 class="h3 mb-3">Catálogo de servicios</h1>

<form class="row g-2 align-items-end mb-3">
  <div class="col-12 col-sm-4">
    <label class="form-label">Categoría</label>
    <select class="form-select" [(ngModel)]="categoria" name="categoria">
      <option value="">Todas</option>
      <option *ngFor="let c of categorias()" [value]="c">{{c}}</option>
    </select>
  </div>
  <div class="col-12 col-sm-4">
    <label class="form-label">Nivel</label>
    <select class="form-select" [(ngModel)]="nivel" name="nivel">
      <option value="">Todos</option>
      <option>Bronce</option><option>Plata</option><option>Oro</option>
    </select>
  </div>
  <div class="col-12 col-sm-4">
    <label class="form-label">Responsable</label>
    <input class="form-control" [(ngModel)]="responsable" name="responsable" placeholder="Ej. TI">
  </div>
</form>

<div class="row row-cols-1 row-cols-md-3 g-3">
  <div class="col" *ngFor="let s of filtrados()">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="h5 card-title">{{s.nombre}}</h2>
        <p class="card-text small text-muted mb-2">{{s.categoria}} • {{s.nivel}} • {{s.responsable}}</p>
        <p class="card-text">{{s.descripcion}}</p>
      </div>
      <div class="card-footer bg-transparent">
        <a [routerLink]="['/service', s.id]" class="btn btn-sm btn-primary">Ver detalle</a>
      </div>
    </div>
  </div>
</div>
  `
})
export class Home {
  categoria = '';
  nivel = '';
  responsable = '';

  list = signal<Service[]>([]);
  categorias = computed(() => Array.from(new Set(this.list().map(s => s.categoria))));

  filtrados = computed(() =>
    this.list().filter(s =>
      (!this.categoria || s.categoria === this.categoria) &&
      (!this.nivel || s.nivel === this.nivel) &&
      (!this.responsable || s.responsable.toLowerCase().includes(this.responsable.toLowerCase()))
    )
  );

  constructor(ds: ServicesData) {
    ds.list$.subscribe(this.list.set);
  }
}
