import { TestBed } from '@angular/core/testing';

import { ImaggaService } from './imagga.service';

describe('ImaggaService', () => {
  let service: ImaggaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImaggaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
