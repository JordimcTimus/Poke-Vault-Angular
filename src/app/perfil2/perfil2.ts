import {Component, OnInit} from '@angular/core';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2'
import {Capcelera} from '../capcelera/capcelera';
import * as brcypt from 'bcryptjs';

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
  constructor(private s:Page, private route:ActivatedRoute){}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (this.id !== '') {
      this.s.getUsuari(this.id).subscribe((res: any) => {
        this.usuari = res;
        this.usuari.id = this.id;
        console.log("_______________________________Usuari________________________________")
        console.log(this.usuari)
        console.log("Nom: " + this.usuari.nom, "Cognom: " + this.usuari.cognom, "Email: " + this.usuari.email, "Telefon: " + this.usuari.telefon)
      })
    }
  }
}
