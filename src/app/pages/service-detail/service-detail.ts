import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../core/services/services-data';
import { Service } from '../../core/models/service';

@Component({
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a routerLink="/">Catálogo</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{svc()?.nombre || '...'}}</li>
  </ol>
</nav>

<section *ngIf="svc()">
  <h1 class="h3">{{svc()!.nombre}}</h1>
  <p class="text-muted">{{svc()!.categoria}} • {{svc()!.nivel}} • {{svc()!.responsable}}</p>
  <p>{{svc()!.descripcion}}</p>
  <p *ngIf="svc()!.ans"><strong>ANS:</strong> {{svc()!.ans}}</p>

  <hr>
  <h2 class="h5 mb-3">Solicitar este servicio</h2>
  <form class="row g-3" (ngSubmit)="submit()">
    <div class="col-md-6">
      <label class="form-label">Nombre</label>
      <input class="form-control" [(ngModel)]="form.nombre" name="nombre" required>
    </div>
    <div class="col-md-6">
      <label class="form-label">Email</label>
      <input class="form-control" [(ngModel)]="form.email" name="email" type="email" required>
    </div>
    <div class="col-12">
      <label class="form-label">Descripción</label>
      <textarea class="form-control" rows="4" [(ngModel)]="form.descripcion" name="descripcion" required></textarea>
    </div>
    <div class="col-12">
      <button class="btn btn-primary">Enviar solicitud</button>
    </div>
  </form>

  <!-- placeholder métrica -->
  <div class="alert alert-info mt-4">Métricas de disponibilidad llegarán en una próxima versión.</div>
</section>
  `
})
export class ServiceDetail {
  svc = signal<Service | undefined>(undefined);
  form = { nombre: '', email: '', descripcion: '' };

  constructor(route: ActivatedRoute, ds: ServicesData) {
    effect(() => {
      const id = Number(route.snapshot.paramMap.get('id'));
      ds.getById(id).subscribe(v => this.svc.set(v));
    });
  }

  submit() {
    alert('Solicitud enviada (mock).');
    this.form = { nombre: '', email: '', descripcion: '' };
  }
}
