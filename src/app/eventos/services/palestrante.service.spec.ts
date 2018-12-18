import { TestBed, inject } from '@angular/core/testing';

import { PalestranteService } from './palestrante.service';

describe('PalestranteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PalestranteService]
    });
  });

  it('should be created', inject([PalestranteService], (service: PalestranteService) => {
    expect(service).toBeTruthy();
  }));
});
