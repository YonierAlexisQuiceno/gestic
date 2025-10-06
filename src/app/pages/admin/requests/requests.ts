import { Component, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RequestsData } from '../../../core/services/requests-data';
import { ServicesData } from '../../../core/services/services-data';
import { combineLatest, map } from 'rxjs';

/**
 * Administrative view to list and manage incoming service requests. This
 * component shows all requests created in the current session and
 * resolves the service names on the fly via the ServicesData
 * service. Administrators can remove a request once it has been
 * handled.
 */
@Component({
  standalone: true,
  // Import NgIf to enable usage of *ngIf in the template. Without this
  // directive imported, Angular will emit NG8103 during compilation.
  imports: [NgFor, NgIf, DatePipe],
  template: `
<h1 class="h3 mb-3">Solicitudes de servicios</h1>
<div class="table-responsive">
  <table class="table align-middle">
    <thead>
      <tr>
        <th>ID</th>
        <th>Fecha</th>
        <th>Solicitante</th>
        <th>Servicio</th>
        <th>Descripción</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let r of list()">
        <td>{{r.id}}</td>
        <td>{{r.createdAt | date:'short'}}</td>
        <td>{{r.nombre}}<br><small class="text-muted">{{r.email}}</small></td>
        <td>{{r.serviceName}}</td>
        <td>{{r.descripcion}}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" (click)="remove(r.id)">Eliminar</button>
        </td>
      </tr>
      <tr *ngIf="list().length === 0">
        <td colspan="6" class="text-center text-muted">No hay solicitudes registradas.</td>
      </tr>
    </tbody>
  </table>
</div>
  `
})
export class RequestsAdmin {
  // We maintain our own list combining requests with service names
  list = signal<{
    id: number;
    nombre: string;
    email: string;
    descripcion: string;
    serviceId: number;
    createdAt: Date;
    serviceName: string;
  }[]>([]);

  constructor(private requests: RequestsData, services: ServicesData) {
    // Combine the list of requests and services to enrich each
    // request with its service name. Whenever either stream
    // emits, the computed list updates accordingly.
    combineLatest([
      this.requests.list$,
      services.list$
    ]).pipe(
      map(([reqs, servicesList]) =>
        reqs.map(r => ({
          ...r,
          serviceName: servicesList.find(s => s.id === r.serviceId)?.nombre || '—'
        }))
      )
    ).subscribe(this.list.set);
  }

  remove(id: number) {
    this.requests.remove(id);
  }
}