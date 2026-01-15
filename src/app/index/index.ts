import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [
    NgOptimizedImage, RouterLink
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

}
