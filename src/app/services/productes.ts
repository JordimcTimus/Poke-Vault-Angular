import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Productes {
  public llistaCaixes: any[] = [];


  constructor() {
    this.llistaCaixes = [{
      id: 0,
      nombre: "Caixa eevee",
      desc: "caixa to guapa",
      preu: 100,
      quantitat: 0
    }
    ]
  }

  public getProducteCaixe(id: number){
    this.llistaCaixes[id].quantitat++
    console.log(this.llistaCaixes[id].quantitat)
  }
}
