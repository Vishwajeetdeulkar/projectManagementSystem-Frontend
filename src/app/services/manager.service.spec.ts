import { TestBed } from '@angular/core/testing';

import { ManagerService } from './manager.service';
import { HttpClient,HttpClientModule,HttpHeaders, HttpParams} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(ManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
