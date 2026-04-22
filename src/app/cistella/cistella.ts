// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';
import {Productes} from '../services/productes';
import {AuthService} from '../services/clientes';

@Component({
  selector: 'app-cistella',
  imports: [
    RouterLink, Capcelera, CurrencyPipe
  ],
  templateUrl: './cistella.html',
  styleUrl: './cistella.css',
})
export class Cistella implements OnInit {
  llistaCarritoCaixes: any[] = []
  llistaCarritoCartes: any[] = []

  constructor(private s: Productes, public auth: AuthService) {
    this.llistaCarritoCaixes = []
    this.llistaCarritoCartes = []
  }

  ngOnInit(): void {
    // @ts-ignore
    for (let i = 0; i < this.auth.getCurrentUser()?.carrito?.length; i++) {
      this.llistaCarritoCaixes.push(this.auth.getCurrentUser()?.carrito)
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
    if (this.s.restarCaixa(id)){
    }
  }
  restarCar(id: number) {
    this.s.restarCarta(id)
  }

  resetCarrito(){
    this.s.resetCarrito();
  }
  totalPreu(): string {
    return this.s.totalPreu().toFixed(2)
  }
}
