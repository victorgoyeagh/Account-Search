import { TestBed, inject } from '@angular/core/testing';

import { AccountSearchService } from './account-search.service';

describe('AccountSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSearchService]
    });
  });

  it('should be created', inject([AccountSearchService], (service: AccountSearchService) => {
    expect(service).toBeTruthy();
  }));
});
