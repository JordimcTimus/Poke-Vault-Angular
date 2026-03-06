import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';
import {RouterLink} from '@angular/router';
import {Productes} from '../services/productes';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  id:number
  imagenPokemon: string = '';
  nombrePokemon: string = '';

  constructor(
    private s: Productes,
    private http: HttpClient
  ) {
    this.id = 0;
  }

  ngOnInit(): void {

  }

  public enviarCarritoCaixe(id: any): void {
    this.s?.getProducteCaixe(id);
  }
}
