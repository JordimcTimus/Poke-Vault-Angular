import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Productes} from '../services/productes';
import { HttpClient } from '@angular/common/http';
import {Page} from '../services/page';
import {UsuariModels} from '../models/usuari.models';
import {AuthService} from '../services/clientes';

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
  usuari:UsuariModels = new UsuariModels()
  userId:any;

  constructor(
    private s: Productes,
    private user: Page,
    private route:ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.id = 0;
  }

  ngOnInit() {
    // Escuchar cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.PonerDatos();
    });
  }

  PonerDatos() {
    console.log('ID actual:', this.id);

    if (this.userId) {
      this.user.getUsuari(this.userId).subscribe((res: any) => {
        this.usuari = res;
        this.usuari.id = this.userId;
        console.log("_______________________________Usuari________________________________");
        console.log(this.usuari);
        console.log("Nom:", this.usuari.nom, "Cognom:", this.usuari.cognom, "Email:", this.usuari.email, "Telefon:", this.usuari.telefon);
        this.cdr.detectChanges();
      });
    }
  }

  public enviarCarritoCaixe(id: any): void {
    this.s?.getProducteCaixe(id);
  }

  public graficPerAdmins(admin: boolean): void{
    if(this.userId == "undefined") {

    }
  }
}
