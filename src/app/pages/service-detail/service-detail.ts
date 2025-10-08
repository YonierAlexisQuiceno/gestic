import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../core/services/services-data';
import { Service } from '../../core/models/service';
import { RequestsData } from '../../core/services/requests-data';

/**
 * Vista de detalle para un servicio. Muestra la información
 * principal del servicio (nombre, descripción, categoría, SLA y
 * estado) y permite al usuario enviar una solicitud describiendo
 * su necesidad. La solicitud se envía al backend a través del
 * servicio RequestsData.
 */
@Component({
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a routerLink="/">Catálogo</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ svc()?.name || '...' }}</li>
  </ol>
</nav>

<section *ngIf="svc()">
  <div class="row g-4">
    <!-- Columna de detalles del servicio -->
    <div class="col-12 col-md-7">
      <h1 class="h3">{{ svc()!.name }}</h1>
      <p class="text-muted">{{ svc()!.category?.name }} • {{ svc()!.sla }}</p>
      <p>{{ svc()!.description }}</p>
      <div class="border rounded p-3 mt-3">
        <h2 class="h6 mb-2">ANS SLA</h2>
        <p class="mb-1"><strong>SLA:</strong> {{ svc()!.sla }}</p>
        <p class="mb-1"><strong>Estado:</strong> {{ svc()!.status }}</p>
      </div>
    </div>

    <!-- Columna del formulario de solicitud -->
    <div class="col-12 col-md-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="h5 mb-3">Solicitar servicio</h2>
          <form (ngSubmit)="submit()">
            <div class="mb-2">
              <label class="form-label">Nombre del solicitante</label>
              <input class="form-control" [(ngModel)]="form.name" name="name" required>
            </div>
            <div class="mb-2">
              <label class="form-label">Correo</label>
              <input class="form-control" type="email" [(ngModel)]="form.email" name="email" required>
            </div>
            <div class="mb-2">
              <label class="form-label">Prioridad</label>
              <select class="form-select" [(ngModel)]="form.priority" name="priority" required>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label">Dependencia/Área</label>
              <input class="form-control" [(ngModel)]="form.department" name="department">
            </div>
            <div class="mb-2">
              <label class="form-label">Descripción de la solicitud</label>
              <textarea class="form-control" rows="3" [(ngModel)]="form.details" name="details" required></textarea>
            </div>
            <div class="d-grid">
              <button class="btn btn-primary">Enviar solicitud</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <p class="mt-4 text-muted">Métricas de disponibilidad próxima versión.</p>
</section>
  `
})
export class ServiceDetail {
  // Servicio cargado desde el backend
  svc = signal<Service | undefined>(undefined);

  /**
   * Datos del formulario de solicitud. Incluye información del
   * solicitante, la prioridad y una descripción. Estos campos son
   * puramente informativos en el MVP; sólo se enviará el detalle al
   * backend para registrar la solicitud.
   */
  form = {
    name: '',
    email: '',
    priority: 'Media',
    department: '',
    details: ''
  };

  constructor(route: ActivatedRoute, ds: ServicesData, private requests: RequestsData) {
    // Efecto que se ejecuta cuando cambia el parámetro de la ruta. Se
    // suscribe al servicio y actualiza el estado local.
    effect(() => {
      const id = Number(route.snapshot.paramMap.get('id'));
      ds.getById(id).subscribe(v => this.svc.set(v));
    });
  }

  /** Envía la solicitud al backend a través de RequestsData. */
  submit() {
    const current = this.svc();
    if (!current) return;
    // Registrar la solicitud enviando el detalle y el id del servicio. Otros
    // campos se ignoran en el MVP pero permiten ampliar el formulario.
    this.requests.create(this.form.details, current.id);
    alert('Solicitud enviada correctamente.');
    // Restablecer los campos del formulario.
    this.form = { name: '', email: '', priority: 'Media', department: '', details: '' };
  }
}