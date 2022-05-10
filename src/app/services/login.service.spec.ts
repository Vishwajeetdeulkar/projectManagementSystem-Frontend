import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
