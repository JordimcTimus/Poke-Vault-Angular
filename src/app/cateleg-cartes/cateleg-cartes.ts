import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-cateleg-cartes',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './cateleg-cartes.html',
  styleUrl: './cateleg-cartes.css',
})
export class CatelegCartes {

  constructor() {
  }


  protected afegirCarta(number: number, bulbasour: string, number2: number) {

  }
}
