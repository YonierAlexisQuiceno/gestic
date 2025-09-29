import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
<h1 class="h3 mb-3">Iniciar sesión</h1>
<form class="row g-3" (ngSubmit)="onSubmit()">
  <div class="col-12">
    <label class="form-label">Usuario</label>
    <input class="form-control" [(ngModel)]="user" name="user" required>
  </div>
  <div class="col-12">
    <label class="form-label">Contraseña</label>
    <input type="password" class="form-control" [(ngModel)]="pass" name="pass" required>
  </div>
  <div class="col-12">
    <button class="btn btn-primary">Entrar</button>
    <a class="btn btn-link disabled">Registrarse (próx.)</a>
    <a class="btn btn-link disabled">¿Olvidaste tu contraseña? (próx.)</a>
  </div>
</form>
  `
})
export class Login {
  user = ''; pass = '';
  constructor(private auth: Auth, private router: Router) {}
  onSubmit() {
    if (this.auth.login(this.user, this.pass)) this.router.navigateByUrl('/admin/services');
    else alert('Credenciales inválidas (mock)');
  }
}
