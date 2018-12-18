import { TestBed, inject } from '@angular/core/testing';

import { QuizzService } from './quizz.service';

describe('QuizzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzService]
    });
  });

  it('should be created', inject([QuizzService], (service: QuizzService) => {
    expect(service).toBeTruthy();
  }));
});
