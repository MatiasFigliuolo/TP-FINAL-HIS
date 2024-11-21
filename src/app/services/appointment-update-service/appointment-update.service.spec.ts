import { TestBed } from '@angular/core/testing';

import { AppointmentUpdatesService } from './appointment-update.service';

describe('AppointmentUpdateService', () => {
  let service: AppointmentUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
