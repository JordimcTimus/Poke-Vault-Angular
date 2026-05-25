import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OblidarContrasenya } from './oblidar-contrasenya';

describe('OblidarContrasenya', () => {
  let component: OblidarContrasenya;
  let fixture: ComponentFixture<OblidarContrasenya>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OblidarContrasenya]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OblidarContrasenya);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
