import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClient,HttpClientModule,HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
