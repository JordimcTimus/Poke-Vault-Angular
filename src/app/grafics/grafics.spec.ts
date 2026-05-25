import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Grafics } from './grafics';
import { FormsModule } from '@angular/forms';

// ── Dades falses ──────────────────────────────────────────────────────────────

const productesMock = [
  { idproducte: 1,   nom: 'Booster Bundle Prismatic Evolutions', tipus: 'caixa' },
  { idproducte: 100, nom: 'Charizard',                           tipus: 'carta' },
  { idproducte: 101, nom: 'Mewtwo',                              tipus: 'carta' },
];

const vendesPerMesMock = [
  { mes: '2025-01', total_venut: 2 },
  { mes: '2025-03', total_venut: 3 },
];

const ofertaMock = [
  { mes: '2025-01', vendes_oferta: 2, vendes_sense_oferta: 1 },
];

function mockFetch(url: string): Promise<Response> {
  let data: any;
  if      (url.includes('GetVendesOfertaVsSenseOferta')) data = ofertaMock;
  else if (url.includes('GetVendesPerMes/'))             data = vendesPerMesMock;
  else if (url.includes('GetProductes'))                 data = productesMock;
  else                                                   data = [];
  return Promise.resolve({ json: () => Promise.resolve(data) } as Response);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Grafics - cas d\'ús: veure els gràfics', () => {
  let component: Grafics;
  let fixture: ComponentFixture<Grafics>;

  beforeEach(async () => {
    vi.spyOn(window, 'fetch').mockImplementation(mockFetch as any);

    await TestBed.configureTestingModule({
      imports: [Grafics, FormsModule],
      providers: [provideRouter([])]   // ← això soluciona el ActivatedRoute
    }).compileComponents();

    fixture = TestBed.createComponent(Grafics);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hauria de crear el component correctament', () => {
    expect(component).toBeTruthy();
  });

  it('hauria de fer fetch a GetProductes', async () => {
    await component.carregarProductes();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetProductes');
  });

  it('hauria de carregar 3 productes', async () => {
    await component.carregarProductes();
    expect(component.productes.length).toBe(3);
  });

  it('hauria de seleccionar el primer producte al slot 0', async () => {
    await component.carregarProductes();
    expect(component.productesSeleccionats[0]).toBe(1);
  });

  it('hauria de tenir els slots 1 i 2 a null per defecte', () => {
    expect(component.productesSeleccionats[1]).toBeNull();
    expect(component.productesSeleccionats[2]).toBeNull();
  });

  it('hauria de tenir 3 colors definits per als selectors', () => {
    expect(component.colorsPunts.length).toBe(3);
    component.colorsPunts.forEach(color => expect(color).toBeTruthy());
  });

  it('hauria de cridar carregarGrafic quan canvia el selector', () => {
    const spy = vi.spyOn(component, 'carregarGrafic');
    component.onSelectorCanviat();
    expect(spy).toHaveBeenCalled();
  });

  it('hauria de fer fetch a GetVendesPerMes amb l\'id del producte seleccionat', async () => {
    component.productesSeleccionats[0] = 1;
    await component.carregarGrafic();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetVendesPerMes/1');
  });

  it('hauria de fer fetch a GetVendesOfertaVsSenseOferta', async () => {
    await component.carregarGraficOferta();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetVendesOfertaVsSenseOferta');
  });

  it('no hauria de fer fetch de vendes si tots els slots són null', async () => {
    component.productesSeleccionats = [null, null, null];
    vi.mocked(window.fetch).mockClear();
    await component.carregarGrafic();
    const cridesFetch = vi.mocked(window.fetch).mock.calls
      .filter((args: any) => args[0].includes('GetVendesPerMes/'));
    expect(cridesFetch.length).toBe(0);
  });
});
