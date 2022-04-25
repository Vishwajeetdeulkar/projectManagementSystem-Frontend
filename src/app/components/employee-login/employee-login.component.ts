import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  credentials={
    username:'',
    password:''
  }

  isError = false;
  errorMsg = '';


  constructor(private loginService:LoginService,private route:Router,private auth:AuthguardService) { }

  ngOnInit(): void {
    if(this.auth.getToken())
    {
      this.route.navigateByUrl("/employeeDashboard")
    }
  }

  onSubmit(){
    this.loginService.login(this.credentials);

    if(this.auth.getToken())
    {
      this.route.navigateByUrl("/employeeDashboard")
    }
    window.location.reload();
  }

}
