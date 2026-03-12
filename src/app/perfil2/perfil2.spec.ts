import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfil2 } from './perfil2';

describe('Perfil2', () => {
  let component: Perfil2;
  let fixture: ComponentFixture<Perfil2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perfil2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
