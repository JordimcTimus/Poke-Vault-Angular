import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { AuthService, Usuari } from '../clientes';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp {

  user = {
    nom: '',
    cognom: '',
    telefon: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) {}

  protected register() {
    this.auth.register(this.user);

    this.user = {
      nom: '',
      cognom: '',
      telefon: '',
      email: '',
      password: ''
    };

    console.log('Usuaris registrats:', this.user);
  }
}
