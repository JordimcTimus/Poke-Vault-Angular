// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';
import {Productes} from '../services/productes';

@Component({
  selector: 'app-cistella',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './cistella.html',
  styleUrl: './cistella.css',
})
export class Cistella implements OnInit {
  llistaCarritoCaixes: any[] = []
  llistaCarritoCartes: any[] = []

  constructor(private s: Productes) {
    this.llistaCarritoCaixes = [{}]
    this.llistaCarritoCartes = [{}]
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
  }

  sumar(id: number) {
    this.s.sumarCaixa(id)
  }

  restar(id: number) {
    this.s.restarCaixa(id)
  }
}
