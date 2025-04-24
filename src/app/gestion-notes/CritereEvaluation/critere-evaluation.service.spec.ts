import { TestBed } from '@angular/core/testing';

import { CritereEvaluationService } from './critere-evaluation.service';

describe('CritereEvaluationService', () => {
  let service: CritereEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CritereEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
