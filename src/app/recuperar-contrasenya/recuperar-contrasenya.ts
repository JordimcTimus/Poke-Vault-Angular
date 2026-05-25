import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-contrasenya',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './recuperar-contrasenya.html',
  styleUrl: './recuperar-contrasenya.css'
})
export class RecuperarContrasenya {
  password = '';
  confirm = '';
  token = '';
  message = '';
  error = '';
  success = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  onSubmit() {
    if (this.password !== this.confirm) {
      this.error = 'Les contrasenyes no coincideixen';
      return;
    }
    this.http.post(`http://localhost:3000/reset-password/${this.token}`, { password: this.password }).subscribe({
      next: (res: any) => {
        this.success = true;
        this.message = res.message;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => { this.error = err.error?.message ?? 'Token invàlid o caducat'; }
    });
  }
}
