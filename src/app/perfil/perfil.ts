import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

  constructor(private s:Page, private route:ActivatedRoute, private cdr: ChangeDetectorRef){}

  ngOnInit() {
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
        this.cdr.detectChanges();
      });
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
