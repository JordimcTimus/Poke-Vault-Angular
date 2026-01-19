import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignUp } from '../sign-up/sign-up';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.css'],
})
export class LogIn {
  email: string = '';
  password: string = '';

  loggedInUser: any = null;

  protected login() {

    let usuarioEncontrado: any = null;

    for (let i = 0; i < SignUp.registreUsers.length; i++) {
      let usuarioActual = SignUp.registreUsers[i];

      if (usuarioActual.email === this.email && usuarioActual.password === this.password) {
        usuarioEncontrado = usuarioActual;
        break;
      }
    }

    if (usuarioEncontrado !== null) {
      this.loggedInUser = usuarioEncontrado;
      this.email = '';
      this.password = '';
    } else {
      alert('Usuari o contraseña incorrectos');
    }
  }
}
