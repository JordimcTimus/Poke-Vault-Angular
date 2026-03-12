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
import {guard} from './guard/guard';
import {Perfil2} from './perfil2/perfil2';

export const routes: Routes = [
  { path: 'caixesPokemon', component: CaixesPokemon, canActivate:[guard]},
  { path: 'capcelera', component: Capcelera, canActivate:[guard]},
  { path: 'cartas', component: CartasPokemon, canActivate:[guard]},
  { path: 'catalegCartas', component: CatelegCartes, canActivate:[guard]},
  { path: 'cistella', component: Cistella, canActivate:[guard]},
  { path: 'index', component: Index, canActivate:[guard] },
  { path: 'login', component: LogIn },
  { path: 'sign-up', component: SignUp },
  { path: 'terminosDeUso', component: TerminosDeUso, canActivate:[guard] },
  { path: 'perfil/:id', component: Perfil, canActivate:[guard] },
  { path: 'perfil2/:id', component: Perfil2, canActivate:[guard] },
  { path: 'oblidar-contrasenya', component: OblidarContrasenya },
  { path: 'recuperar-contrasenya/:token', component: RecuperarContrasenya },
  { path: 'sign-up/:id', component: SignUp, canActivate:[guard] },
  { path: '', redirectTo: '/index', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
