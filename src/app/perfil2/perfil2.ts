import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Capcelera} from '../capcelera/capcelera';


@Component({
  selector: 'app-perfil2',
  imports: [
    RouterLink,
    Capcelera,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './perfil2.html',
  styleUrl: './perfil2.css',
})
export class Perfil2 implements OnInit{
  usuari:UsuariModels = new UsuariModels()
  id:any;
  constructor(private s:Page,
              private route:ActivatedRoute,
              private cdr: ChangeDetectorRef,
  ){
  }

  ngOnInit() {
    // Escuchar cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.PonerDatos();
    });
  }

  PonerDatos() {
    console.log('ID actual:', this.id);

    if (this.id) {
      this.s.getUsuari(this.id).subscribe((res: any) => {
        this.usuari = res;
        this.usuari.id = this.id;
        console.log("_______________________________Usuari________________________________");
        console.log(this.usuari);
        console.log("Nom:", this.usuari.nom, "Cognom:", this.usuari.cognom, "Email:", this.usuari.email, "Telefon:", this.usuari.telefon);
        console.log("Current User:")
        console.log(localStorage.getItem('currentUser'))
        this.cdr.detectChanges();
      });
    }
  }
}
