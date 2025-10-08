import { Component, signal } from '@angular/core';
import { ServicesData } from '../../../core/services/services-data';
import { RequestsData } from '../../../core/services/requests-data';

/**
 * Panel de control para administradores. Muestra estadísticas
 * generales sobre los servicios y las solicitudes. En versiones
 * futuras se añadirán gráficos y métricas más avanzadas.
 */
@Component({
  standalone: true,
  template: `
<h1 class="h3 mb-3">Panel de control</h1>
<div class="row g-3">
  <div class="col-12 col-md-6">
    <div class="card p-3 text-center shadow-sm">
      <h2 class="h6 text-muted">Servicios publicados</h2>
      <p class="display-5 fw-bold mb-0">{{ totalServices() }}</p>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <div class="card p-3 text-center shadow-sm">
      <h2 class="h6 text-muted">Solicitudes registradas</h2>
      <p class="display-5 fw-bold mb-0">{{ totalRequests() }}</p>
    </div>
  </div>
</div>
<p class="mt-4 text-muted">Próximamente: métricas de satisfacción y tiempos de respuesta.</p>
  `
})
export class AdminDashboard {
  totalServices = signal(0);
  totalRequests = signal(0);

  constructor(services: ServicesData, requests: RequestsData) {
    services.list$.subscribe(list => this.totalServices.set(list.length));
    requests.list$.subscribe(list => this.totalRequests.set(list.length));
  }
}