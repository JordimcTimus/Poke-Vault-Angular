import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { AuthService } from '../services/clientes';
import Swal from 'sweetalert2';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';
import * as brcypt from 'bcryptjs';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp implements OnInit{
  usuari:UsuariModels = new UsuariModels()
  id:any;
  isEditing:boolean = false;
  newPassword:String = '';

  constructor(private auth: AuthService, private s:Page, private route:ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (this.id !== '') {
      this.isEditing = true
      this.s.getUsuari(this.id).subscribe((res:any)=>{
        this.usuari = res;
        this.usuari.password = this.usuari.password || '';
        this.usuari.id = this.id;
        console.log(this.usuari)
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

    if (!this.isEditing) {
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
    } else {
      if (this.newPassword.trim()){
        const saltRounds = 10
        this.usuari.password = brcypt.hashSync(this.newPassword.trim(), saltRounds)
      }
    }

    if (!this.isEditing) {
      this.s.verificarEmail(this.usuari.email).subscribe((existeix:boolean) =>{
        if (existeix) {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "El correu ja existeix"
          })
        } else {
          this.s.crearUsuari(this.usuari).subscribe(res =>{
            Swal.fire({
              icon: 'success',
              title: 'Funciona',
              text: "L'usuari s'ha creat correctament"
            })
          })
        }
      })
    } else {
      this.s.updateUsuari(this.usuari).subscribe(res =>{
        Swal.fire({
          icon: 'success',
          title: 'Funciona',
          text: "S'ha modificat l'usuari correctament"
        })
      })
    }
    this.isEditing = false
  }

  protected readonly UsuariModels = UsuariModels;
}
