export class Producte {
  idproducte: number;
  descripcio?: string;
  ruta_imatge?: string;
  nom?: string;
  ofertaActiva?: string;
  quantitat?: number;
  preu?: number;

  constructor(
    idproducte: number,
    descripcio?: string,
    ruta_imatge?: string,
    nom?: string,
    ofertaActiva?: string,
    quantitat?: number,
    preu?: number
  ) {
    this.idproducte = idproducte;
    this.descripcio = descripcio;
    this.ruta_imatge = ruta_imatge;
    this.nom = nom;
    this.ofertaActiva = ofertaActiva;
    this.quantitat = quantitat;
    this.preu = preu;
  }
}
