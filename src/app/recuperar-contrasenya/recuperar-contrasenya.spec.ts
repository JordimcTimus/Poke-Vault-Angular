import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenya } from './recuperar-contrasenya';

describe('RecuperarContrasenya', () => {
  let component: RecuperarContrasenya;
  let fixture: ComponentFixture<RecuperarContrasenya>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarContrasenya]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenya);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
