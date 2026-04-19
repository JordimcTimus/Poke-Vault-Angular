import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, TooltipItem } from 'chart.js/auto';
import { Capcelera } from '../capcelera/capcelera';
import { FormsModule } from '@angular/forms';

const NOMS_MESOS = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];

const COLORS_LINIES = [
  { border: 'rgb(75, 192, 192)',  background: 'rgba(75, 192, 192, 0.2)' },
  { border: 'rgb(255, 99, 132)',  background: 'rgba(255, 99, 132, 0.2)' },
  { border: 'rgb(255, 205, 86)', background: 'rgba(255, 205, 86, 0.2)' },
];

interface Producte     { idproducte: number; nom: string; tipus: string; }
interface VendaMensual { mes: string; total_venut: number; }

@Component({
  selector: 'app-grafics',
  imports: [Capcelera, FormsModule],
  templateUrl: './grafics.html',
  styleUrl: './grafics.css',
})
export class Grafics implements OnInit {

  // @ts-ignore
  grafic: Chart;

  productes: Producte[] = [];
  productesSeleccionats: (number | null)[] = [null, null, null];
  colorsPunts = COLORS_LINIES.map(c => c.border);

  ngOnInit(): void {
    this.carregarProductes();
  }

  async carregarProductes(): Promise<void> {
    const resposta = await fetch('http://localhost:3000/GetProductes');
    this.productes = await resposta.json();

    if (this.productes.length > 0) {
      this.productesSeleccionats[0] = this.productes[0].idproducte;
      this.carregarGrafic();
    }
  }

  onSelectorCanviat(): void {
    this.carregarGrafic();
  }

  async carregarGrafic(): Promise<void> {
    const liniesGrafic = [];

    for (let i = 0; i < 3; i++) {
      const idProducte = this.productesSeleccionats[i];
      if (!idProducte) continue;

      const resposta = await fetch(`http://localhost:3000/GetVendesPerMes/${idProducte}`);
      const vendesMensuals: VendaMensual[] = await resposta.json();

      // Creem un array de 12 zeros i omplim els mesos amb dades reals
      const unitatsPerMes = Array(12).fill(0);
      vendesMensuals.forEach(venda => {
        const indexMes = parseInt(venda.mes.split('-')[1], 10) - 1;
        unitatsPerMes[indexMes] = Number(venda.total_venut);
      });

      const nomProducte = this.productes.find(p => p.idproducte === Number(idProducte))?.nom ?? `Producte ${idProducte}`;
      const nomCurt     = nomProducte.length > 30 ? nomProducte.substring(0, 30) + '…' : nomProducte;

      liniesGrafic.push({
        label:           nomCurt,
        data:            unitatsPerMes,
        fill:            false,
        borderColor:     COLORS_LINIES[i].border,
        backgroundColor: COLORS_LINIES[i].background,
        tension:         0.3,
        pointRadius:     5,
        pointHoverRadius: 8,
        pointHitRadius:  20,
      });
    }

    if (this.grafic) this.grafic.destroy();

    this.grafic = new Chart('grafic-vendes', {
      type: 'line' as ChartType,
      data: { labels: NOMS_MESOS, datasets: liniesGrafic },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top' },
          title:  { display: true, text: 'Unitats venudes per mes' },
          tooltip: {
            callbacks: {
              title: (items: TooltipItem<'line'>[]) => NOMS_MESOS[items[0].dataIndex],
              label: (item:  TooltipItem<'line'>) => ` ${item.dataset.label}: ${item.parsed.y} unitats`,
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Unitats venudes' },
            ticks: { stepSize: 1, callback: (valor: any) => `${valor} u.` }
          },
          x: { title: { display: true, text: 'Mes' } }
        }
      }
    });
  }
}
