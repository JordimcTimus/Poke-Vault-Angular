import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CaixesPokemon} from './caixes-pokemon/caixes-pokemon';
import {Capcelera} from './capcelera/capcelera';
import {CartasPokemon} from './cartas-pokemon/cartas-pokemon';
import {CatelegCartes} from './cateleg-cartes/cateleg-cartes';
import {Cistella} from './cistella/cistella';
import {Index} from './index';
import { LogIn  } from './log-in/log-in';
import { SignUp } from './sign-up/sign-up';
import {TerminosDeUso} from './terminos-de-uso/terminos-de-uso';
import { Perfil } from './perfil/perfil';
import { OblidarContrasenya } from './oblidar-contrasenya/oblidar-contrasenya';
import { RecuperarContrasenya } from './recuperar-contrasenya/recuperar-contrasenya';

export const routes: Routes = [
  { path: 'caixesPokemon', component: CaixesPokemon},
  { path: 'capcelera', component: Capcelera},
  { path: 'cartas', component: CartasPokemon},
  { path: 'catalegCartas', component: CatelegCartes},
  { path: 'cistella', component: Cistella},
  { path: 'index', component: Index },
  { path: 'login', component: LogIn },
  { path: 'sign-up', component: SignUp },
  { path: 'terminosDeUso', component: TerminosDeUso },
  { path: 'perfil/:id', component: Perfil },
  { path: 'oblidar-contrasenya', component: OblidarContrasenya },
  { path: 'recuperar-contrasenya/:token', component: RecuperarContrasenya },
  { path: 'sign-up/:id', component: SignUp },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
