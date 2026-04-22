import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Grafics } from './grafics';
import { FormsModule } from '@angular/forms';

// ── Dades falses (no toca el servidor real) ───────────────────────────────────

const productesMock = [
  { idproducte: 1,   nom: 'Booster Bundle Prismatic Evolutions', tipus: 'caixa' },
  { idproducte: 100, nom: 'Charizard',                           tipus: 'carta' },
  { idproducte: 101, nom: 'Mewtwo',                              tipus: 'carta' },
];

const vendesPerMesMock = [
  { mes: '2025-01', total_venut: 2 },
  { mes: '2025-03', total_venut: 3 },
  { mes: '2025-06', total_venut: 2 },
];

const ofertaMock = [
  { mes: '2025-01', vendes_oferta: 2, vendes_sense_oferta: 1 },
  { mes: '2025-03', vendes_oferta: 1, vendes_sense_oferta: 3 },
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
    spyOn(window, 'fetch').and.callFake(mockFetch as any);

    await TestBed.configureTestingModule({
      imports: [Grafics, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Grafics);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // 1. El component es crea sense errors
  it('hauria de crear el component correctament', () => {
    expect(component).toBeTruthy();
  });

  // 2. Carrega els productes de l'endpoint correcte
  it('hauria de fer fetch a GetProductes', fakeAsync(async () => {
    await component.carregarProductes();
    tick(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetProductes');
  }));

  // 3. La llista de productes s'omple correctament
  it('hauria de carregar 3 productes', fakeAsync(async () => {
    await component.carregarProductes();
    tick(100);
    expect(component.productes.length).toBe(3);
  }));

  // 4. El primer producte queda seleccionat per defecte
  it('hauria de seleccionar el primer producte al slot 0', fakeAsync(async () => {
    await component.carregarProductes();
    tick(100);
    expect(component.productesSeleccionats[0]).toBe(1);
  }));

  // 5. Els slots 1 i 2 comencen buits
  it('hauria de tenir els slots 1 i 2 a null per defecte', () => {
    expect(component.productesSeleccionats[1]).toBeNull();
    expect(component.productesSeleccionats[2]).toBeNull();
  });

  // 6. Els colors dels punts dels selectors estan definits
  it('hauria de tenir 3 colors definits per als selectors', () => {
    expect(component.colorsPunts.length).toBe(3);
    component.colorsPunts.forEach(color => expect(color).toBeTruthy());
  });

  // 7. Canviar el selector crida carregarGrafic
  it('hauria de cridar carregarGrafic quan canvia el selector', () => {
    spyOn(component, 'carregarGrafic');
    component.onSelectorCanviat();
    expect(component.carregarGrafic).toHaveBeenCalled();
  });

  // 8. El gràfic de vendes fa fetch amb l'id correcte
  it('hauria de fer fetch a GetVendesPerMes amb l\'id del producte seleccionat', fakeAsync(async () => {
    component.productesSeleccionats[0] = 1;
    await component.carregarGrafic();
    tick(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetVendesPerMes/1');
  }));

  // 9. El gràfic d'oferta fa fetch a l'endpoint correcte
  it('hauria de fer fetch a GetVendesOfertaVsSenseOferta', fakeAsync(async () => {
    await component.carregarGraficOferta();
    tick(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/GetVendesOfertaVsSenseOferta');
  }));

  // 10. Si no hi ha producte seleccionat, no es fa fetch de vendes
  it('no hauria de fer fetch de vendes si tots els slots són null', fakeAsync(async () => {
    component.productesSeleccionats = [null, null, null];
    (window.fetch as jasmine.Spy).calls.reset();
    await component.carregarGrafic();
    tick(100);
    const cridesFetch = (window.fetch as jasmine.Spy).calls.all()
      .filter((c: any) => c.args[0].includes('GetVendesPerMes/'));
    expect(cridesFetch.length).toBe(0);
  }));
});
