import {ChangeDetectorRef, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuariModels} from '../models/usuari.models';
import {Page} from './page';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from './clientes';
import {DoubleDataType} from 'sequelize';

@Injectable({
  providedIn: 'root',
})
export class Productes {
  public llistaCaixes: any[] = [];
  public llistaCartes: any[] = [];
  usuari: UsuariModels = new UsuariModels()
  userId: any;
  prodPreu: number = 0;

  constructor(private http: HttpClient, private s: Page, private route: ActivatedRoute, public auth: AuthService) {
    this.llistaCaixes = [{
      id: 0,
      nombre: "Booster Bundle Prismatic Evolutions - Ingles",
      descripcio: "Incluye seis sobres de refuerzo de Scarlet & Violet — Evoluciones Prismaticas",
      preu: 59.95,
      texquant: "-- Cantidad:",
      quantitat: 0,
      imagen: "/assets/caja_eevee.png"
    },
      {
        id: 1,
        nombre: "Caja Inferno X M2 - Japones",
        descripcio: "30 sobres con 5 cartas cada uno de la colección Inferno X M2 en Japonés.",
        preu: 119.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/CajaCharizardAzul.png"
      },
      {
        id: 2,
        nombre: "ETB Caja de Entrenador Elite Mega Evolución Gardevoir - Españo",
        descripcio: "15 sobres de mejora de Mega Evolucion de JCC Pokémon TCG",
        preu: 64.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/CajaMegaGardevoir.png"
      },
      {
        id: 3,
        nombre: "ETB Caja de Entrenador Elite Mega Evolución Lucario - Español",
        descripcio: "9 sobres de mejora de Mega Evolucion de JCC Pokémon TCG",
        preu: 64.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/CajaMegaLucario.png"
      },
      {
        id: 4,
        nombre: "Booster Bundle White Flare - Ingles",
        descripcio: "Contiene 6 sobres de refuerzo de Scarlet & Violet — White Flare.",
        preu: 49.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/CajaReshiram.png"
      },
      {
        id: 5,
        nombre: "Booster Bundle Black Bolt - Ingles",
        descripcio: "Contiene 6 sobres de refuerzo de Scarlet & Violet — White Flare.",
        preu: 49.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/CajaZekrom.png"
      },
      {
        id: 6,
        nombre: "Caja Colección Mewtwo EX del Team Rocket - Español",
        descripcio: "1 carta holográfica de promoción de Mewtwo ex del Team Rocket" +
          "4 sobres de mejora de JCC Pokemon TCG",
        preu: 29.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/ColecciónMewtwo.png"
      },
      {
        id: 7,
        nombre: "Lata Team Rocket - Español",
        descripcio: "×4 Sobres de expansión variados." +
          "3 Cartas promocionales",
        preu: 29.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/LataTeamRocket.png"
      },
      {
        id: 8,
        nombre: "Caja Colección Mega-Latias EX - Español",
        descripcio: "1 carta holográfica de promoción de Mega-Latias EX" +
          "1 carta holográfica Jumbo de gran tamaño con efecto 3D de Mega-Latias EX" +
          " 4 sobres de mejora de JCC Pokemon TCG",
        preu: 29.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/PaqueteMegaLatios.png"
      },
      {
        id: 9,
        nombre: "Caja de 36 Sobres de Mega Evolución - Español",
        descripcio: "36 sobres de mejora de MegaEvolution | MegaEvolución en español",
        preu: 199.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/PaquetesMegaEvo.png"
      },
      {
        id: 10,
        nombre: "ETB Caja de Entrenador Elite Mascarada Crepuscular - Español",
        descripcio: "9 Sobres de SV06" +
          "1 Carta Promocional" +
          "65 Fundas para Cartas" +
          "1 Caja del Coleccionista con Separadores",
        preu: 64.95,
        texquant: "-- Cantidad:",
        quantitat: 0,
        imagen: "/assets/Caja%20Mascara%20Crepuscular.png"
      }
    ]
    // @ts-ignore
    this.llistaCartes = [{
      id: 0,
      nombre: "Charizard",
      preu: 19.95,
      quantitat: 0,
      texquant: "-- Cantidad:",
      imagen: "/assets/Charizard.jpg"
    },
      {
        id: 1,
        nombre: "Mewtwo",
        preu: 15.50,
        quantitat: 0,
        texquant: "-- Cantidad:",
        imagen: "/assets/Mewtwo.jpg"
      },
      {
        id: 2,
        nombre: "Bulbasaur",
        preu: 30.00,
        quantitat: 0,
        texquant: "-- Cantidad:",
        imagen: "/assets/Bulbasaur.jpg"
      }]
    this.userId = this.auth.getCurrentUser()
    console.log(this.userId)
  }

  public getProducteCaixe(id: number) {
    let user = this.userId.id
    console.log(user)
    console.log(this.userId.id)
    this.comprobarCarritos(user).subscribe({
      next: (res) => {
        this.getPreu(id).subscribe((data) => {
          let preu = data
          console.log("Preu:" + preu)

          const dataLimit = new Date();
          dataLimit.setDate(dataLimit.getDate() + 7)
          if (res == null) {
            console.log("Carrito no existe")
            console.log("Creando carrito")
            this.http.post('http://localhost:3000/CrearCarrito', {idusuari: user}).subscribe({
              next: (nuevoCarrito: any) => {
                console.log("s'ha creat el carrito", nuevoCarrito)
                this.http.post('http://localhost:3000/AfegirLineaCarrito', {
                  idcarrito: nuevoCarrito.idcarrito,
                  idproducte: id,
                  quantitat: 1,
                  preu: preu,
                  data_limit: dataLimit
                }).subscribe({
                  next: (res) => console.log("Se ha añadido el producto", res),
                  error: (err) => console.log("Error al añadir el producto", err)
                })
              },
              error: (err) => {
                console.log("No s'ha creat el carrito", err)
              }
            })
          } else {
            console.log("Carrito existe")
            this.comprobarProducteCarrito(res.idcarrito, id).subscribe(linia => {
              if (linia == null) {
                console.log("Afegint producte");
                this.http.post('http://localhost:3000/AfegirLineaCarrito', {
                  idcarrito: res.idcarrito,
                  idproducte: id,
                  quantitat: 1,
                  preu: preu,
                  data_limit: dataLimit
                }).subscribe({
                  next: (res) => console.log("Se ha añadido el producto", res),
                  error: (err) => console.log("Error al añadir el producto", err)
                })
              } else {
                console.log("Producte repetit");
              }
            });
          }
        })
      },
      error: (err) => {
        console.log("Carrito no existeix", err)
      }
    })
  }

  public comprobarCarritos(user: any) {
    return this.http.get<any>('http://localhost:3000/get-carritos/' + user);
  }

  public comprobarProducteCarrito(user: any, id: number) {
    return this.http.get<any>(`http://localhost:3000/GetProdCarrito/${user}/${id}`);
  }

  public getPreu(id: number) {
    return this.http.get<any>('http://localhost:3000/GetProductes/Preu/' + id);
  }

  sumarCaixa(id: number) {
    let item = this.llistaCaixes.find(c => c.id === id);
    if (item) {
      item.quantitat++;
    }
  }

  restarCaixa(id: number): boolean | any {
    let item = this.llistaCaixes.find(c => c.id === id);
    if (item && item.quantitat > 0) {
      item.quantitat--;
      if (item.quantitat <= 0) {
        return true
      }
    }
  }

  resetCarrito() {
    this.llistaCaixes.forEach(item => item.quantitat = 0);
    this.llistaCartes.forEach(item => item.quantitat = 0);
  }

  // @ts-ignore
  totalPreu(): number {
    let preuCaixes = 0;
    let preuCartes = 0;

    this.llistaCaixes.forEach(item => {
      preuCaixes += item.preu * item.quantitat;
    });
    this.llistaCartes.forEach(item => {
      preuCartes += item.preu * item.quantitat;
    });
    return preuCaixes + preuCartes;
  }

  sumarCarta(id: number) {
    let item = this.llistaCartes.find(c => c.id === id);
    if (item) {
      item.quantitat++;
    }
  }

  restarCarta(id: number) {
    let item = this.llistaCartes.find(c => c.id === id);
    if (item && item.quantitat > 0) {
      item.quantitat--;
    }
  }
}
