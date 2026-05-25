import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixesPokemon } from './caixes-pokemon';

describe('CaixesPokemon', () => {
  let component: CaixesPokemon;
  let fixture: ComponentFixture<CaixesPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixesPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixesPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
