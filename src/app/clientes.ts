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

  get users(): Usuari[] {
    return this.registreUsers;
  }

  get loggedInUser(): Usuari | null {
    return this._loggedInUser;
  }

  register(user: Usuari) {
    this.registreUsers.push({ ...user });
    console.log('Usuaris registrats:', this.registreUsers);
  }

  login(email: string, password: string): boolean {
    const trobat = this.registreUsers.find(
      u => u.email === email && u.password === password
    );

    if (trobat) {
      this._loggedInUser = trobat;
      return true;
    }

    this._loggedInUser = null;
    return false;
  }

  logout() {
    this._loggedInUser = null;
  }
}
