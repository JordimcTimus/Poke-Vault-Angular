import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-caixes-pokemon',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './caixes-pokemon.html',
  styleUrl: './caixes-pokemon.css',
})
export class CaixesPokemon {

}
