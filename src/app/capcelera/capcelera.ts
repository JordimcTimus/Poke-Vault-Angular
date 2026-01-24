import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AuthService } from '../clientes';

@Component({
  selector: 'app-capcelera',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
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
