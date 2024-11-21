import { TestBed } from '@angular/core/testing';

import { AppointmentUpdateService } from './appointment-update.service';

describe('AppointmentUpdateService', () => {
  let service: AppointmentUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
