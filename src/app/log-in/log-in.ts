import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../services/clientes';
import {UsuariModels} from '../models/usuari.models';
import {NgFor} from '@angular/common';

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
  usuari = new UsuariModels()
  showPassword: boolean = false;
  //email: string = '';
  //password: string = '';

  constructor(private auth: AuthService) {}

  //logearse 1
  //protected login() {

    //const ok = this.auth.login(this.email, this.password);

    //if (ok) {
      //alert('USUARIO CONECTADO');
      //this.email = '';
      //this.password = '';
    //} else {
      //alert('Usuari o contraseña incorrectos');

    //}
  //}
  login(forma:NgForm){
    this.usuari = forma.value
    this.auth.login(this.usuari)
    console.log(this.usuari)
  }
}
