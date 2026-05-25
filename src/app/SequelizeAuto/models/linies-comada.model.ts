export class LiniesComanda {
  idlinia: number;
  idcomandes: number;
  idproducte: number;
  quantitat: number;

  constructor(idlinia: number, idcomandes: number, idproducte: number, quantitat: number = 1) {
    this.idlinia = idlinia;
    this.idcomandes = idcomandes;
    this.idproducte = idproducte;
    this.quantitat = quantitat;
  }
}
