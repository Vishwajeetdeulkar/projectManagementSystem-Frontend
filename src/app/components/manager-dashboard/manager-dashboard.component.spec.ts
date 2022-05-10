import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';
import { ManagerService } from 'src/app/services/manager.service';

import { ManagerDashboardComponent } from './manager-dashboard.component';

describe('ManagerDashboardComponent', () => {
  let component: ManagerDashboardComponent;
  let fixture: ComponentFixture<ManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ ManagerDashboardComponent ],
      providers : [
        ManagerService,
        LoginService,
        AuthguardService,
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
