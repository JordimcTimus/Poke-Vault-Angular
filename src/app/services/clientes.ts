import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import {UsuariModels} from '../models/usuari.models';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Page} from './page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.urlServer
  private _loggedInUser: UsuariModels | null = null;

  constructor(private http: HttpClient, private r:Router) {
    // Carregar sessió si existeix
    this._loggedInUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  // ======================
  // LOG IN
  // ======================
  login(usuari:UsuariModels){
    this.http.get<{[key:string]:UsuariModels}>(`${this.apiUrl}/usuaris.json?orderBy=
    "email"&equalTo="${usuari.email}"`).subscribe((res:{[key:string]:UsuariModels})=>{
      // @ts-ignore
      const [id,userData] = Object.entries(res)[0]
      const user = {id,...(userData as UsuariModels)}
      if (user){
        if(user.email === usuari.email) {
          const passwordToCompare = usuari.password ?? ''
          const storedPassword = user.password ?? ''
          // @ts-ignore
          const isMatch = bcrypt.compareSync(passwordToCompare,storedPassword)
          if (isMatch) {
            console.log("login exitós")
            const usuariTemp = {...user}
            if (user.Administrador) {
              localStorage.setItem('adminUser', JSON.stringify(usuariTemp))
            } else {
              localStorage.setItem('currentUser', JSON.stringify(usuariTemp))
            }
            this.r.navigate(['/index'])
          } else {
            console.log("Contrasenya incorrecte")
            Swal.fire('Error', 'Revisa el email o la contrassenya', 'error')
          }
        } else {
          console.log("Correu incorrecte")
          Swal.fire('Error', 'Revisa el email o la contrassenya', 'error')
        }
      } else {
        console.log("Usuari no valid")
        Swal.fire('Error', 'Usuari no Valid', 'error')
      }
    })
  }

  // =========================
  // COMPROBAR SI ESTÀ LOGEJAT
  // =========================
  isLoged():boolean {
    const user = localStorage.getItem('currentUser')
    const admin = localStorage.getItem('adminUser')
    if (user) {
      return user !== null
    } else {
      return admin !== null
    }
  }

  // ======================
  // OBTENIR USUARI ACTUAL
  // ======================
  // @ts-ignore
  getCurrentUser():UsuariModels | null {
    const user = localStorage.getItem('currentUser')
    const admin = localStorage.getItem('adminUser')
    if (!user && !admin) {
      return null
    }
    if (user) {
      return JSON.parse(user)
    } else {
      return JSON.parse(<string>admin)
    }
  }

  // ======================
  // LOGOUT
  // ======================
  logout() {
  this._loggedInUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('adminUser');
  this.r.navigate(['/index'])
  }

}
