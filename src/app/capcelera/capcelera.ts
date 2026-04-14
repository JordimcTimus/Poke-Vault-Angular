import { Component, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/clientes';
import { UsuariModels } from '../models/usuari.models';
import { HttpClient } from '@angular/common/http';
import {Page} from '../services/page';

@Component({
  selector: 'app-capcelera',
  imports: [NgOptimizedImage, RouterLink, NgIf],
  templateUrl: './capcelera.html',
  styleUrl: './capcelera.css',
})
export class Capcelera {
  imagenPokemon: string = 'assets/Poké_Ball.png';
  nombrePokemon: string = 'Pokémon';
  usuari: UsuariModels = new UsuariModels();

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private r: Router,
    private cdr: ChangeDetectorRef,
    private s:Page
  ) {}

  ngOnInit() {
    this.obtenerPokemonAleatorio();
  }

  obtenerPokemonAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 1010) + 1;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`).subscribe({
        next: (pokemon) => {
          // Primera letra en mayúscula
          this.nombrePokemon = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          this.imagenPokemon = pokemon.sprites.front_default;
          this.cdr.detectChanges();
        }
      });
  }

  logout() {
    const confirmacio = confirm('¿Seguro que quieres salir de la cuenta?');

    if (confirmacio) {
      this.auth.logout();
    }
  }

  obrirPerfil(id: any){
    console.log(id)
    this.r.navigate(['/perfil2/', id]);
  }

  protected readonly UsuariModels = UsuariModels;
}
