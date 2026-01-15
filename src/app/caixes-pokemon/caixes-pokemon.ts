import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-caixes-pokemon',
  imports: [
    NgOptimizedImage, RouterLink
  ],
  templateUrl: './caixes-pokemon.html',
  styleUrl: './caixes-pokemon.css',
})
export class CaixesPokemon {

}
