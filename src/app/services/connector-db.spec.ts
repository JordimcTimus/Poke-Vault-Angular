import { TestBed } from '@angular/core/testing';

import { ConnectorDb } from './connector-db';

describe('ConnectorDb', () => {
  let service: ConnectorDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectorDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
