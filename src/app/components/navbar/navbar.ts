import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  template: `
<nav class="navbar navbar-expand-lg" style="font-size: 1.2rem;">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center custom-hover"
       routerLink="/"
       routerLinkActive="active fw-bold text-primary"
       [routerLinkActiveOptions]="{ exact: true }"
       style="cursor:pointer;">
      <img src="assets/logo.png" alt="Logo IES CINOC" class="me-2" style="height:40px; width:auto;">
      <span class="fw-semibold" style="font-size: 1.5rem;">GESTIC</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a routerLink="/" 
             routerLinkActive="active fw-bold text-primary" 
             [routerLinkActiveOptions]="{ exact: true }"
             class="nav-link custom-hover" style="font-size: 1.2rem;">Catálogo</a>
        </li>
        <!-- Enlaces visibles sólo cuando el usuario ha iniciado sesión -->
        <ng-container *ngIf="auth.loggedIn$ | async">
          <li class="nav-item">
            <a routerLink="/admin/dashboard" 
               routerLinkActive="active fw-bold text-primary" 
               class="nav-link custom-hover" style="font-size: 1.2rem;">Dashboard</a>
          </li>
          <li class="nav-item">
            <a routerLink="/admin/services" 
               routerLinkActive="active fw-bold text-primary" 
               class="nav-link custom-hover" style="font-size: 1.2rem;">Servicios</a>
          </li>
          <li class="nav-item">
            <a routerLink="/admin/requests" 
               routerLinkActive="active fw-bold text-primary" 
               class="nav-link custom-hover" style="font-size: 1.2rem;">Solicitudes</a>
          </li>
          <li class="nav-item">
            <a routerLink="/admin/users" 
               routerLinkActive="active fw-bold text-primary" 
               class="nav-link custom-hover" style="font-size: 1.2rem;">Usuarios</a>
          </li>
          <li class="nav-item">
            <a routerLink="/admin/automations" 
               routerLinkActive="active fw-bold text-primary" 
               class="nav-link custom-hover" style="font-size: 1.2rem;">Automatizaciones</a>
          </li>
        </ng-container>
      </ul>
      <div class="d-flex">
        <a *ngIf="!(auth.loggedIn$ | async)" class="btn btn-outline-light" routerLink="/login" style="font-size: 1.1rem;">Iniciar sesión</a>
        <button *ngIf="auth.loggedIn$ | async" class="btn btn-outline-light" (click)="auth.logout()" style="font-size: 1.1rem;">Salir</button>
      </div>
    </div>
  </div>
</nav>
  `,
  styles: [`
    .custom-hover:hover,
    .custom-hover.active {
      color: #0d6efd !important;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {
  constructor(public auth: Auth) {}
}
