import { Component, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RequestsData } from '../../../core/services/requests-data';
import { ServicesData } from '../../../core/services/services-data';
import { combineLatest, map } from 'rxjs';
import { RequestStatus } from '../../../core/models/request';

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
        <th>Estado</th>
        <th>Servicio</th>
        <th>Detalles</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let r of list()">
        <td>{{r.id}}</td>
        <td>{{r.requestDate | date:'short'}}</td>
        <td>
          <span class="badge"
            [class.text-bg-secondary]="r.status === 'PENDIENTE'"
            [class.text-bg-warning]="r.status === 'EN_PROCESO'"
            [class.text-bg-success]="r.status === 'COMPLETADA'"
            [class.text-bg-danger]="r.status === 'CANCELADA'">
            {{r.status}}
          </span>
        </td>
        <td>{{r.serviceName}}</td>
        <td>{{r.details}}</td>
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
  // Mantenemos nuestra propia lista combinando solicitudes con el
  // nombre del servicio. Incluimos el estado para mostrarlo con
  // distintivos de color.
  list = signal<{
    id: number;
    requestDate: string;
    status: RequestStatus;
    serviceName: string;
    details: string;
  }[]>([]);

  constructor(private requests: RequestsData, services: ServicesData) {
    // Combinar las solicitudes con los servicios para enriquecer cada
    // solicitud con el nombre del servicio. Si la API devuelve el
    // objeto service embebido se utiliza, en caso contrario se
    // localiza por id.
    combineLatest([
      this.requests.list$,
      services.list$
    ]).pipe(
      map(([reqs, servicesList]) =>
        reqs.map(r => {
          const svcName = r.service?.name ?? servicesList.find(s => s.id === r.serviceId)?.name ?? '—';
          return {
            id: r.id,
            requestDate: r.requestDate,
            status: r.status,
            serviceName: svcName,
            details: r.details
          };
        })
      )
    ).subscribe(this.list.set);
  }

  remove(id: number) {
    this.requests.remove(id);
  }
}