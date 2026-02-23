import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';
import {Productes} from '../services/productes';

@Component({
  selector: 'app-cateleg-cartes',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './cateleg-cartes.html',
  styleUrl: './cateleg-cartes.css',
})
export class CatelegCartes {
  id:number
  constructor(private s: Productes) {
    this.id = 0;
  }
  public enviarCarritoCarta (id:any){
    this.s.getProducteCarta(id)
  }
}
