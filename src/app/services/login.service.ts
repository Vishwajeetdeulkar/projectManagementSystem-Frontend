import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  url = "http://localhost:5050";
  
  constructor(private router:Router,private http:HttpClient) { }

  managerLogin(credentials:any){
    return this.http.post(`${this.url}/token`, credentials)
  }


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
