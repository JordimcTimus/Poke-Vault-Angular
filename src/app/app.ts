import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CaixesPokemon} from './caixes-pokemon/caixes-pokemon';
import {CartasPokemon} from './cartas-pokemon/cartas-pokemon';
import {CatelegCartes} from './cateleg-cartes/cateleg-cartes';
import {Cistella} from './cistella/cistella';
import {Index} from './index';
import {LogIn} from './log-in/log-in';
import {SignUp} from './sign-up/sign-up';
import {TerminosDeUso} from './terminos-de-uso/terminos-de-uso';
import {Capcelera} from './capcelera/capcelera';
import {HttpClientModule} from '@angular/common/http';
import { VigilantIAService } from './services/techeable-machine';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule ,CaixesPokemon, CartasPokemon, CatelegCartes, Cistella, Index, LogIn, SignUp, TerminosDeUso, Capcelera],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pokevault-angular');

  constructor(private vigilantIA: VigilantIAService) {}

  ngOnInit(): void {
    this.vigilantIA.iniciar();
  }
}
