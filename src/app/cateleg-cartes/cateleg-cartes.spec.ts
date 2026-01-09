import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelegCartes } from './cateleg-cartes';

describe('CatelegCartes', () => {
  let component: CatelegCartes;
  let fixture: ComponentFixture<CatelegCartes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatelegCartes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatelegCartes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
