import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-cistella',
  imports: [
    NgOptimizedImage, RouterLink, Capcelera
  ],
  templateUrl: './cistella.html',
  styleUrl: './cistella.css',
})
export class Cistella {

}
