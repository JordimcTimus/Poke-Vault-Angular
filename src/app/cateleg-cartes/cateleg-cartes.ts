import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cateleg-cartes',
  imports: [
    NgOptimizedImage, RouterLink
  ],
  templateUrl: './cateleg-cartes.html',
  styleUrl: './cateleg-cartes.css',
})
export class CatelegCartes {

}
