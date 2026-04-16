import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grafics } from './grafics';

describe('Grafics', () => {
  let component: Grafics;
  let fixture: ComponentFixture<Grafics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grafics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Grafics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
