import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Bot } from './bot';
import { Capcelera } from '../capcelera/capcelera';  // ← añadir

@Component({ selector: 'app-capcelera', template: '', standalone: true })
class MockCapcelera {}

describe('Bot Component — cas d\'ús: enviar pregunta al bot', () => {
  let component: Bot;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bot, HttpClientTestingModule],
      providers: [provideRouter([])]
    })
      .overrideComponent(Bot, {
        remove: { imports: [Capcelera] },  // ← cambio clave
        add: { imports: [MockCapcelera] }
      })
      .compileComponents();

    const fixture = TestBed.createComponent(Bot);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    httpMock.match(() => true).forEach(req => req.flush({}));
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush({}));
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial bot message', () => {
    expect(component.missatges.length).toBeGreaterThan(0);
    expect(component.missatges[0].tipus).toBe('bot');
  });

  it('should not send if pregunta is empty', () => {
    component.pregunta = '';
    component.enviar();
    httpMock.expectNone('http://localhost:3000/api/chat');
  });

  it('should clear pregunta after sending', () => {
    component.pregunta = 'Quins productes teniu?';
    component.enviar();
    expect(component.pregunta).toBe('');
    httpMock.expectOne('http://localhost:3000/api/chat').flush({ resposta: 'Tenim cartes' });
  });

  it('should add user message to missatges', () => {
    component.pregunta = 'Quins productes teniu?';
    component.enviar();
    expect(component.missatges.some(m => m.tipus === 'usuari')).toBeTruthy();
    httpMock.expectOne('http://localhost:3000/api/chat').flush({ resposta: 'Tenim cartes' });
  });

  it('should show loading message while waiting', () => {
    component.pregunta = 'Quins productes teniu?';
    component.enviar();
    expect(component.missatges.some(m => m.tipus === 'cargant')).toBeTruthy();
    httpMock.expectOne('http://localhost:3000/api/chat').flush({ resposta: 'Tenim cartes' });
  });

  it('should add bot response to missatges', () => {
    component.pregunta = 'Quins productes teniu?';
    component.enviar();
    httpMock.expectOne('http://localhost:3000/api/chat').flush({ resposta: 'Tenim cartes Pokémon' });
    expect(component.missatges.some(m => m.tipus === 'bot' && m.text === 'Tenim cartes Pokémon')).toBeTruthy();
  });

  it('should handle connection error', () => {
    component.pregunta = 'test';
    component.enviar();
    httpMock.expectOne('http://localhost:3000/api/chat').error(new ErrorEvent('Network error'));
    expect(component.missatges.some(m => m.tipus === 'Error')).toBeTruthy();
  });
});
