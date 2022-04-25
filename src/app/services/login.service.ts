import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router:Router) { }

  login(credentials:any){
    localStorage.setItem("SessionUser",credentials.username);
  }


  logout()
  {
    console.log('loginService/logout')
    localStorage.removeItem("SessionUser");
    this.router.navigateByUrl("/welcome");
  }
}
