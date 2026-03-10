import {Component, OnInit} from '@angular/core';
import {UsuariModels} from '../models/usuari.models';
import {Page} from '../services/page';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2'
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-perfil',
  imports: [
    RouterLink,
    Capcelera
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit{
  usuari = new UsuariModels()
  id:any;

  constructor(private s:Page, private route:ActivatedRoute, private r: Router){ }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (this.id !== '') {
      this.s.getUsuari(this.id).subscribe((res:any)=>{
        this.usuari = res;
        this.usuari.id = this.id;
        console.log(this.usuari)
      })
    }
  }

  configPerfil(id:string){
    this.r.navigate(['/sign-up/', id]);
  }
}
