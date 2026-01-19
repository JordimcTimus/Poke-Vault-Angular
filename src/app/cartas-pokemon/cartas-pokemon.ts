import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-cartas-pokemon',
  imports: [RouterLink, NgOptimizedImage, Capcelera],
  templateUrl: './cartas-pokemon.html',
  styleUrl: './cartas-pokemon.css',
})
export class CartasPokemon {

}
