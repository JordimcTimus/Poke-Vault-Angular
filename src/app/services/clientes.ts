import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import {UsuariModels} from '../models/usuari.models';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.urlServer
  //private registreUsers: Usuari[] = [];
  private _loggedInUser: UsuariModels | null = null;

  constructor(private http: HttpClient, private r:Router) {
    // Cargar usuarios guardados
    //this.registreUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Cargar sesión si existe
    this._loggedInUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

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
            localStorage.setItem('currentUser', JSON.stringify(usuariTemp))
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

  isLoged():boolean {
    const user = localStorage.getItem('currentUser')
    return user !== null
  }

  // @ts-ignore
  getCurrentUser():UsuariModels | null {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }

  //get users(): Usuari[] {
  //return this.registreUsers;
  //}

  //get loggedInUser(): Usuari | null {
  //return this._loggedInUser;
  //}

  // ======================
  // REGISTER
  // ======================
  //register(user: Usuari) {
  //this.registreUsers.push({ ...user });

  //localStorage.setItem('users', JSON.stringify(this.registreUsers));

  //console.log('Usuaris registrats:', this.registreUsers);
  //}

  // ======================
  // LOGIN
  // ======================
  //login(email: string, password: string): boolean {
  //const trobat = this.registreUsers.find(
  //u => u.email === email && u.password === password
  //);

  //if (trobat) {
  //  this._loggedInUser = trobat;
  //  localStorage.setItem('loggedUser', JSON.stringify(trobat));
  //  return true;
  //}

  //  return false;
  //}

  // ======================
  // LOGOUT
  // ======================
  logout() {
  this._loggedInUser = null;
  localStorage.removeItem('currentUser');
  this.r.navigate(['/index'])
  }
}
