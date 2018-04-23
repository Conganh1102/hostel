import { TestBed, inject } from '@angular/core/testing';

import { AgmService } from './agm.service';

describe('AgmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgmService]
    });
  });

  it('should be created', inject([AgmService], (service: AgmService) => {
    expect(service).toBeTruthy();
  }));
});
