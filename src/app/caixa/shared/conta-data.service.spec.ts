import { TestBed } from '@angular/core/testing';

import { ContaDataService } from './conta-data.service';

describe('ContaDataService', () => {
  let service: ContaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
