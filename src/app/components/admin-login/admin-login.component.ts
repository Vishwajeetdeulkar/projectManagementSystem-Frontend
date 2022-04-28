import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


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
      this.loginService.adminPing().subscribe(
        (response:any)=>{
          console.log("get response of ping")
          this.route.navigateByUrl("/adminDashboard");
        },
        (error:any) => {
          console.log(error);
          this.route.navigateByUrl("/welcome");
        }
      )
    }
  }
  onSubmit(){
    this.loginService.login(this.credentials).subscribe(
        (response:any) => {
          console.log("response")
          localStorage.setItem("SessionUser",response["token"]);
          this.loginService.adminPing().subscribe(
            (response:any)=>{
              console.log("get response of ping")
              this.route.navigateByUrl("/adminDashboard");
            },
            (error:any) => {
              console.log(error);
            }
          )

        },
        (error:any) => {
          console.log(error);
        }
    );

  }



}
