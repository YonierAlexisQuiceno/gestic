import { TestBed } from '@angular/core/testing';

import { ServicesData } from './services-data';

describe('ServicesData', () => {
  let service: ServicesData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
