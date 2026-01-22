import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AuthService } from '../clientes';

@Component({
  selector: 'app-capcelera',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './capcelera.html',
  styleUrl: './capcelera.css',
})
export class Capcelera {

  constructor(private auth: AuthService) {}

  get loggedInUser() {
    return this.auth.loggedInUser;
  }
}
