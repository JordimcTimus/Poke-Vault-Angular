// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';
import {Productes} from '../services/productes';

@Component({
  selector: 'app-cistella',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera, CurrencyPipe
  ],
  templateUrl: './cistella.html',
  styleUrl: './cistella.css',
})
export class Cistella implements OnInit {
  llistaCarritoCaixes: any[] = []
  llistaCarritoCartes: any[] = []

  constructor(private s: Productes) {
    this.llistaCarritoCaixes = []
    this.llistaCarritoCartes = []
  }

  ngOnInit(): void {
    for (let i = 0; i < this.s.llistaCaixes.length; i++) {
      if (this.s.llistaCaixes[i].quantitat > 0) {
        this.llistaCarritoCaixes.push(this.s.llistaCaixes[i])
      }
    }
    for (let i = 0; i < this.s.llistaCartes.length; i++) {
      if (this.s.llistaCartes[i].quantitat > 0) {
        this.llistaCarritoCartes.push(this.s.llistaCartes[i])
      }
    }
    console.log(this.llistaCarritoCartes.length)
  }

  sumarCaix(id: number) {
    this.s.sumarCaixa(id)
  }
  sumarCar(id:number) {
    this.s.sumarCarta(id)
  }
  restarCaix(id: number) {
    this.s.restarCaixa(id)
  }
  restarCar(id: number) {
    this.s.restarCarta(id)
  }

  resetCarrito(){
    this.s.resetCarrito();
  }
  // @ts-ignore
  totalPreu(): string {
    return this.s.totalPreu().toFixed(2)
  }
}
