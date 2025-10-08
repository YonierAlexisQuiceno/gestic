import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'service/:id', loadComponent: () => import('./pages/service-detail/service-detail').then(m => m.ServiceDetail) },
  { path: 'admin/services', canActivate: [authGuard], loadComponent: () => import('./pages/admin/services/services').then(m => m.Services) },
  { path: 'admin/requests', canActivate: [authGuard], loadComponent: () => import('./pages/admin/requests/requests').then(m => m.RequestsAdmin) },
  { path: 'admin/dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.AdminDashboard) },
  { path: 'admin/users', canActivate: [authGuard], loadComponent: () => import('./pages/admin/users/users').then(m => m.UsersAdmin) },
  { path: 'admin/automations', canActivate: [authGuard], loadComponent: () => import('./pages/admin/automations/automations').then(m => m.AdminAutomations) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '' }
];
