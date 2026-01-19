import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  user = {
    nom: '',
    cognom: '',
    telefon: '',
    email: '',
    password: ''
  };

  static registreUsers: any[] = [];

  protected register() {
    SignUp.registreUsers.push({ ...this.user }); // Se hace una copia del objeto

    this.user = {
      nom: '',
      cognom: '',
      telefon: '',
      email: '',
      password: ''
    };

    console.log('Usuaris registrats:', SignUp.registreUsers);
  }
}
