import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Productes {
  public llistaCaixes: any[] = [];
  public llistaCartes: any[] = []


  constructor() {
    this.llistaCaixes = [{
      id: 0,
      nombre: "Caixa eevee",
      desc: "caixa to guapa",
      preu: 100,
      quantitat: 0,
      img: "assets/caja_eevee.png"
    }
    ]
    // @ts-ignore
    this.llistaCartes[{
      id: 0,
      nombre: "Bulbasaur",
      desc: "caixa to guapa",
      preu: 10,
      quantitat: 0,
      img: "assets/Bulbasaur.jpg/"
    }]
  }

  public getProducteCaixe(id: number){
    this.llistaCaixes[id].quantitat++
    console.log(this.llistaCaixes[id].quantitat)
  }
}
