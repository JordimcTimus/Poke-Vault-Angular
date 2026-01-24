import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';
import {RouterLink} from '@angular/router';
import {Productes} from '../services/productes';

@Component({
  selector: 'app-index',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  id:number
  constructor(private s: Productes) {
    this.id = 0;
  }
  public enviarCarrito (id:any){
    this.s.getProducte(id)
  }
}
