import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/clientes';
//import * as brcypt from 'bcryptjs';
import {UsuariModels} from '../models/usuari.models';

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

  //logearse 1
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
}
