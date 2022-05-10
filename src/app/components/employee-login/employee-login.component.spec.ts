import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';

import { EmployeeLoginComponent } from './employee-login.component';

describe('EmployeeLoginComponent', () => {
  let component: EmployeeLoginComponent;
  let fixture: ComponentFixture<EmployeeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ EmployeeLoginComponent ],
      providers:[
        LoginService,
        AuthguardService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
