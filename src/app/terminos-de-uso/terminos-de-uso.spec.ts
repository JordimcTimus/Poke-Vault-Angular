import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosDeUso } from './terminos-de-uso';

describe('TerminosDeUso', () => {
  let component: TerminosDeUso;
  let fixture: ComponentFixture<TerminosDeUso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminosDeUso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminosDeUso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
