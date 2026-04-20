import { Injectable } from '@angular/core';
import { AuthService } from './clientes';
import Swal from 'sweetalert2';

const MODEL_URL           = 'https://teachablemachine.withgoogle.com/models/BFjvqTZXP/';
const GESTOS_NO_AMIGABLES = ['DedoMedio', 'Nazi'];
const CONFIANCA_MINIMA    = 1;
const GESTOS_PER_TANCAR   = 4;

@Injectable({ providedIn: 'root' })
export class VigilantIAService {

  private model:          any;
  private webcam:         any;
  private tmImage:        any;
  private animFrameId:    number | null = null;
  private gestosComptats  = 0;
  private alertaActiva    = false;
  private sessioTancada   = false;

  constructor(private authService: AuthService) {}

  async iniciar(): Promise<void> {
    await this.carregarScripts();

    try {
      this.tmImage = (window as any).tmImage;

      this.model = await this.tmImage.load(
        MODEL_URL + 'model.json',
        MODEL_URL + 'metadata.json'
      );

      // Webcam invisible — només per a detecció, no es mostra a la pantalla
      this.webcam = new this.tmImage.Webcam(200, 200, true);
      await this.webcam.setup();
      await this.webcam.play();

      this.bucle();

    } catch (error) {
      console.error('VigilantIA: error en iniciar', error);
    }
  }

  aturar(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.webcam) this.webcam.stop();
  }

  // ── Bucle de detecció ─────────────────────────────────────────────────────

  private async bucle(): Promise<void> {
    if (this.sessioTancada) return;
    this.webcam.update();
    await this.detectar();
    this.animFrameId = requestAnimationFrame(() => this.bucle());
  }

  private async detectar(): Promise<void> {
    const prediccions = await this.model.predict(this.webcam.canvas);

    // Log general per veure què detecta en cada frame
    const millor = prediccions.reduce((a: any, b: any) => a.probability > b.probability ? a : b);
    console.log(`Detectant: ${millor.className} (${(millor.probability * 100).toFixed(1)}%)`);

    const gestoDetectat = prediccions.find((p: any) =>
      GESTOS_NO_AMIGABLES.includes(p.className) && p.probability >= CONFIANCA_MINIMA
    );

    if (gestoDetectat && !this.alertaActiva) {
      this.alertaActiva = true;
      this.gestosComptats++;
      console.log(`Gest detectat: ${gestoDetectat.className} | Confiança: ${(gestoDetectat.probability * 100).toFixed(1)}% | Comptador: ${this.gestosComptats}/${GESTOS_PER_TANCAR}`);

      if (this.gestosComptats >= GESTOS_PER_TANCAR) {
        this.tancarSessio();
      } else {
        setTimeout(() => { this.alertaActiva = false; }, 2000);
      }
    }
  }

  // ── Tanca la sessió ───────────────────────────────────────────────────────

  private tancarSessio(): void {
    this.sessioTancada = true;
    this.aturar();

    Swal.fire({
      icon:               'warning',
      title:              'Sessió tancada',
      text:               'S\'han detectat gestos no permesos.',
      confirmButtonText:  'Acceptar',
      confirmButtonColor: '#e63946',
    }).then(() => this.authService.logout());
  }

  // ── Carrega les llibreries de Teachable Machine ───────────────────────────

  private carregarScripts(): Promise<void> {
    const scripts = [
      'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js',
      'https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js',
    ];

    return scripts.reduce((promesa, src) => {
      return promesa.then(() => new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script   = document.createElement('script');
        script.src     = src;
        script.onload  = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      }));
    }, Promise.resolve());
  }
}
