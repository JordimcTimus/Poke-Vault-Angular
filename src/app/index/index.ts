import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';
import {RouterLink} from '@angular/router';
import {Productes} from '../services/productes';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  id:number

  constructor(
    private s: Productes,
    private http: HttpClient
  ) {
    this.id = 0;
  }

  ngOnInit(): void {

  }

  obtenerPokemonAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 1010) + 1;

    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`)
      .subscribe(pokemon => {
        console.log(pokemon.name);
        console.log(pokemon.sprites.front_default);
      });
  }

  public enviarCarritoCaixe(id: any): void {
    this.s?.getProducteCaixe(id);
  }
  //hola
}
