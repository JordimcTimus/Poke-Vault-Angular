import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {Capcelera} from '../capcelera/capcelera';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';


@Component({
  selector: 'app-ressenyes',
  imports: [
    Capcelera,
    FormsModule,
    NgxCaptchaModule,
  ],
  templateUrl: './ressenyes.html',
  styleUrl: './ressenyes.css',
})
export class Ressenyes implements AfterViewInit {
  nom = '';
  email = '';
  titol = '';
  comentari = '';
  enviat = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.render(
          document.querySelector('.g-recaptcha'),
          { sitekey: '6Ld7E_AsAAAAAEHkjZhDWvWrisxncKGRlkFdbcq5', theme: 'dark' }
        );
      }
    }, 500);
  }

  enviar() {
    this.http.post('http://localhost:3000/api/ressenya', {
      nom: this.nom,
      email: this.email,
      titol: this.titol,
      comentari: this.comentari
    }).subscribe(() => this.enviat = true);
  }
}
