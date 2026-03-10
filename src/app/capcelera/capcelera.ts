import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AuthService } from '../services/clientes';
import { Router } from '@angular/router';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';

@Component({
  selector: 'app-capcelera',
  imports: [
    NgOptimizedImage, RouterLink, NgIf, NgForOf
  ],
  templateUrl: './capcelera.html',
  styleUrl: './capcelera.css',
})


export class Capcelera{
  usuaris = new UsuariModels();

  constructor(public auth: AuthService,private r: Router,private s:Page) {}
  logout() {
    const confirmacio = confirm('¿Seguro que quieres salir de la cuenta?');

    if (confirmacio) {
      this.auth.logout();
    }
  }

  obrirPerfil(id: any){
    console.log(id)
    this.r.navigate(['/perfil/', id]);

  }


  protected readonly UsuariModels = UsuariModels;
}
