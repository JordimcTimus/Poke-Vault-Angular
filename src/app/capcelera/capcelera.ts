import { Component } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AuthService } from '../services/clientes';
import { Router } from '@angular/router';
import {UsuariModels} from '../models/usuari.models';

@Component({
  selector: 'app-capcelera',
  imports: [
    NgOptimizedImage, RouterLink, NgIf, NgForOf
  ],
  templateUrl: './capcelera.html',
  styleUrl: './capcelera.css',
})


export class Capcelera {
  usuari:UsuariModels = new UsuariModels();
  constructor(public auth: AuthService,private r: Router) {}

  logout() {
    const confirmacio = confirm('¿Seguro que quieres salir de la cuenta?');

    if (confirmacio) {
      this.auth.logout();
    }
  }
  obrirPerfil(id:string){
    this.r.navigate(['/perfil/', id]);
  }

  protected readonly UsuariModels = UsuariModels;
}
