import { TestBed } from '@angular/core/testing';

import { AppendHeaderAuthInterceptor } from './append-header-auth';

describe('AppendHeaderAuthInterceptorService', () => {
  let service: AppendHeaderAuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppendHeaderAuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
