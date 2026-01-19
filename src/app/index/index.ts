import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-index',
  imports: [
    NgOptimizedImage,
    Capcelera
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

}
