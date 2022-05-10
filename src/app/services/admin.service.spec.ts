import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClient,HttpClientModule,HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule]

    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
