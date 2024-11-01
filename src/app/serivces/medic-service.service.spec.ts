import { TestBed } from '@angular/core/testing';

import { MedicServiceService } from './medic-service.service';

describe('MedicServiceService', () => {
  let service: MedicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
