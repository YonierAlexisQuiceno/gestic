import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';

/**
 * Panel de automatizaciones. Muestra un listado de flujos n8n
 * planificados para Gestic. Esta vista es un placeholder para
 * futuras integraciones y permite al administrador ver las
 * automatizaciones definidas y su estado.
 */
@Component({
  standalone: true,
  imports: [NgFor],
  template: `
<h1 class="h3 mb-3">Automatizaciones (n8n)</h1>
<p>Los siguientes flujos muestran ejemplos de procesos automáticos que se integrarán en la plataforma:</p>
<ul class="list-group mb-3">
  <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let a of automations()">
    <div>
      <strong>{{ a.name }}</strong>
      <p class="mb-0 small text-muted">{{ a.description }}</p>
    </div>
    <span class="badge" [class.text-bg-success]="a.active" [class.text-bg-secondary]="!a.active">
      {{ a.active ? 'Activa' : 'Inactiva' }}
    </span>
  </li>
</ul>
<p class="mt-4 text-muted">Integración con n8n en progreso.</p>
  `
})
export class AdminAutomations {
  // Lista de automatizaciones de ejemplo. Cada elemento define
  // un nombre, descripción y si está activo actualmente.
  automations = signal([
    { name: 'Notificación de nuevas solicitudes', description: 'Envía un correo al responsable cada vez que se crea una nueva solicitud.', active: true },
    { name: 'Recordatorio de SLA', description: 'Envía recordatorios automáticos cuando se aproxima el vencimiento del SLA.', active: false },
    { name: 'Sincronización de inventario', description: 'Actualiza el inventario en el sistema externo periódicamente.', active: false }
  ]);
}