import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Productes {
  private llistaCaixes: any[] = [];


  constructor() {
    this.llistaCaixes = [{
      id: 0,
      nombre: "Caixa eevee",
      desc: "caixa to guapa",
      preu: 100,
      quantitat: 1
    }
    ]
  }

  private getProducte(id: number){
    for (let i = 0; i < this.llistaCaixes.length; i++)
      if (this.llistaCaixes[i].quantitat > 0) {
        console.log("FUNCIONAAA")
        return this.llistaCaixes[id];
      }
  }
}
