import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cartas-pokemon',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './cartas-pokemon.html',
  styleUrl: './cartas-pokemon.css',
})
export class CartasPokemon {

}
