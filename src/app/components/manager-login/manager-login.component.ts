import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  credentials={
    username:'',
    password:''
  }

  isError = false;
  errorMsg = '';

  constructor(private _snackBar:MatSnackBar, private loginService:LoginService,private route:Router,private auth:AuthguardService) { }

  ngOnInit(): void {
    if(this.auth.getToken())
    {
      this.loginService.managerPing().subscribe(
        (response:any)=>{
          console.log("get response of ping")
          window.location.href="/managerDashboard";
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
          this.loginService.managerPing().subscribe(
            (response:any)=>{
              console.log("get response of ping")
              window.location.href="/managerDashboard";
            },
            (error:any) => {
              this._snackBar.open(error, 'Close', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2* 1000,
              });
            }
          )

        },
        (error:any) => {
          this._snackBar.open(error["error"], 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2* 1000,
          });
          this.isError = true;
        }
    );

    // if(this.auth.getToken())
    // {
    //   this.route.navigateByUrl("/managerDashboard")
    // }
    // window.location.reload();
  }

}
