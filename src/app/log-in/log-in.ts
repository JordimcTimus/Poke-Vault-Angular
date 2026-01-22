import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../clientes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.css'],
})
export class LogIn {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  protected login() {

    const ok = this.auth.login(this.email, this.password);

    if (ok) {
      alert('USUARIO CONECTADO');
      this.email = '';
      this.password = '';
    } else {
      alert('Usuari o contraseña incorrectos');
    }
  }

  get loggedInUser() {
    return this.auth.loggedInUser;
  }
}
