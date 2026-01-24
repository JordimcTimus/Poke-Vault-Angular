import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AuthService } from '../clientes';
import {Productes} from '../services/productes';


@Component({
  selector: 'app-capcelera',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './capcelera.html',
  styleUrl: './capcelera.css',
})
export class Capcelera {

  constructor(public auth: AuthService) {}

  logout() {
    const confirmacio = confirm('¿Seguro que quieres salir de la cuenta?');

    if (confirmacio) {
      this.auth.logout();
    }
  }
}
