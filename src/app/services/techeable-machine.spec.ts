import { TestBed } from '@angular/core/testing';

import { TecheableMachine } from './techeable-machine';

describe('TecheableMachine', () => {
  let service: TecheableMachine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecheableMachine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
