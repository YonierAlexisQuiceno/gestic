import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  template: `
<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
  <div class="container">
    <a class="navbar-brand" routerLink="/">GESTIC</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a routerLink="/" routerLinkActive="active" class="nav-link">Catálogo</a></li>
        <li class="nav-item"><a routerLink="/admin/services" routerLinkActive="active" class="nav-link">Admin</a></li>
      </ul>
      <div class="d-flex">
        <a *ngIf="!(auth.loggedIn$ | async)" class="btn btn-outline-primary" routerLink="/login">Iniciar sesión</a>
        <button *ngIf="auth.loggedIn$ | async" class="btn btn-outline-secondary" (click)="auth.logout()">Salir</button>
      </div>
    </div>
  </div>
</nav>
  `
})
export class NavbarComponent {
  constructor(public auth: Auth) {}
}
