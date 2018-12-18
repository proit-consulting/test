import { TestBed, inject } from '@angular/core/testing';

import { TemaService } from './tema.service';

describe('TemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemaService]
    });
  });

  it('should be created', inject([TemaService], (service: TemaService) => {
    expect(service).toBeTruthy();
  }));
});
