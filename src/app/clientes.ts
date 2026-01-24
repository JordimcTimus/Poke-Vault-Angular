import { Injectable } from '@angular/core';

export interface Usuari {
  nom: string;
  cognom: string;
  telefon: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registreUsers: Usuari[] = [];
  private _loggedInUser: Usuari | null = null;

  constructor() {
    // Cargar usuarios guardados
    this.registreUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Cargar sesión si existe
    this._loggedInUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  get users(): Usuari[] {
    return this.registreUsers;
  }

  get loggedInUser(): Usuari | null {
    return this._loggedInUser;
  }

  // ======================
  // REGISTER
  // ======================
  register(user: Usuari) {
    this.registreUsers.push({ ...user });

    localStorage.setItem('users', JSON.stringify(this.registreUsers));

    console.log('Usuaris registrats:', this.registreUsers);
  }

  // ======================
  // LOGIN
  // ======================
  login(email: string, password: string): boolean {
    const trobat = this.registreUsers.find(
      u => u.email === email && u.password === password
    );

    if (trobat) {
      this._loggedInUser = trobat;
      localStorage.setItem('loggedUser', JSON.stringify(trobat));
      return true;
    }

    return false;
  }

  // ======================
  // LOGOUT
  // ======================
  logout() {
    this._loggedInUser = null;
    localStorage.removeItem('loggedUser');
  }
}
