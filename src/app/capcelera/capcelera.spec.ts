import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Capcelera } from './capcelera';

describe('Capcelera', () => {
  let component: Capcelera;
  let fixture: ComponentFixture<Capcelera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capcelera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Capcelera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
