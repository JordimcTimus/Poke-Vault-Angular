import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasPokemon } from './cartas-pokemon';

describe('CartasPokemon', () => {
  let component: CartasPokemon;
  let fixture: ComponentFixture<CartasPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartasPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartasPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
