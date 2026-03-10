import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-oblidar-contrasenya',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './oblidar-contrasenya.html',
  styleUrl: './oblidar-contrasenya.css'

})
export class OblidarContrasenya {
  email = '';
  message = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.http.post('http://localhost:3000/forgot-password', { email: this.email }).subscribe({
      next: (res: any) => { this.message = res.message; this.loading = false; },
      error: () => { this.message = 'Error en enviar el correu.'; this.loading = false; }
    });
  }
}
