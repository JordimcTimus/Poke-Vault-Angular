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

    this.llistaCartes = [{
      id: 0,
      nombre: "Bulbasaur",
      desc: "Bulbasaur",
      preu: 10,
      quantitat: 0,
      img: "assets/Bulbasaur.jpg"
    }
    ]

    this.llistaCartes = [{
      id: 1,
      nombre: "Charizard V",
      desc: "Charizard V",
      preu: 20,
      quantitat: 0,
      img: "assets/Charizard.jpg"
    }
    ]

    this.llistaCartes = [{
      id: 2,
      nombre: "Mewtwo",
      desc: "Mewtwo",
      preu: 30,
      quantitat: 0,
      img: "assets/Mewtwo.jpg"
    }
    ]
  }

  public getProducteCaixe(id: number){
    this.llistaCaixes[id].quantitat++
    console.log(this.llistaCaixes[id].quantitat)
  }
}
