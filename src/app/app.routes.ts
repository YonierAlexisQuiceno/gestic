import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'service/:id', loadComponent: () => import('./pages/service-detail/service-detail').then(m => m.ServiceDetail) },
  { path: 'admin/services', canActivate: [authGuard], loadComponent: () => import('./pages/admin/services/services').then(m => m.Services) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '' }
];
