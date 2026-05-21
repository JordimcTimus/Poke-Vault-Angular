import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule, NgClass} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Capcelera} from '../capcelera/capcelera';

@Component({
  selector: 'app-bot',
  imports: [
    FormsModule, NgClass, CommonModule, Capcelera
  ],
  templateUrl: './bot.html',
  styleUrl: './bot.css',
})
export class Bot {
    missatges: any[] = [
      { text: 'Yepa pregunta lo que quieras panchito', tipus: 'bot' }
    ];
    pregunta: string = '';
    carregant: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  enviar() {
    console.log('enviar cridat!');
    if (!this.pregunta.trim() || this.carregant) return;
    console.log('passant el if...');

    this.missatges.push({text: this.pregunta, tipus: 'usuari'});
    const preguntaEnviada = this.pregunta;
    this.pregunta = '';
    this.carregant = true;
    this.missatges.push({text: 'Pensant ^^', tipus: 'cargant'});
    this.cdr.detectChanges();
    this.scrollAbajo();
    console.log('fent la crida HTTP...');


    this.http.post<any>('http://localhost:3000/api/chat', { pregunta: preguntaEnviada }).subscribe({
      next: data => {
        console.log('data complet:', JSON.stringify(data));
        this.missatges = this.missatges.filter(m => m.tipus !== 'cargant');

        console.log('missatges després:', this.missatges);
        this.missatges.push({ text: data.resposta, tipus: 'bot' });

        console.log('missatges finals:', this.missatges);
        this.carregant = false;
        this.scrollAbajo();
      },
      error: (err) => {
        console.log('error:', err);
        this.missatges = this.missatges.filter(m => m.tipus !== 'cargant');
        this.missatges.push({ text: 'Error al connectar amb el bot', tipus: 'Error'})
        this.carregant = false;
        this.cdr.detectChanges();
        this.scrollAbajo();
      }
    })
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') this.enviar();
  }

  scrollAbajo() {
    setTimeout(() => {
      const chat = document.getElementById('chat');
      if (chat) chat.scrollTop = chat.scrollHeight;
      this.cdr.detectChanges();
    }, 50);
  }
}
