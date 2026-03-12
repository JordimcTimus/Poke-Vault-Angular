import {Component, OnInit} from '@angular/core';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2'
import {Capcelera} from '../capcelera/capcelera';
import * as brcypt from 'bcryptjs';

@Component({
  selector: 'app-perfil',
  imports: [
    RouterLink,
    Capcelera,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit{
  usuari:UsuariModels = new UsuariModels()
  id:any;
  newPassword:String = '';
  user:UsuariModels = new UsuariModels();

  constructor(private s:Page, private route:ActivatedRoute, private r: Router){}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (this.id !== '') {
      this.s.getUsuari(this.id).subscribe((res: any) => {
        this.usuari = res;
        console.log(this.usuari)
        this.usuari.id = this.id;
      })
    }
  }
  guardar(forma:NgForm){
    Swal.fire({
      icon: 'info',
      title: "ESPERA",
      text: "Guardar informació",
      allowOutsideClick:false
    });

    Swal.showLoading()

    if (!this.newPassword.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'La contrasenya és obligatoria'
      })
      return
    } else {
      const saltRounds = 10
      this.usuari.password = brcypt.hashSync(this.newPassword.trim(), saltRounds)
    }
    if (this.newPassword.trim()){
      const saltRounds = 10
      this.usuari.password = brcypt.hashSync(this.newPassword.trim(), saltRounds)
    }
    // @ts-ignore
    this.getUserEmail(this.id).subscribe(res => {
      this.user = res
      if (this.user.email === this.usuari.email) {
        this.s.updateUsuari(this.usuari).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Funciona',
            text: "S'ha modificat l'usuari correctament"
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: "Aquest correu no es el teu"
        })
      }
    })
  }

  getUserEmail(id:string) {
    return this.s.getUsuari(id)
  }
}
