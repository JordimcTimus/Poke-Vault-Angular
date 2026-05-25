import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ressenyes } from './ressenyes';

describe('Ressenyes', () => {
  let component: Ressenyes;
  let fixture: ComponentFixture<Ressenyes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ressenyes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ressenyes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
