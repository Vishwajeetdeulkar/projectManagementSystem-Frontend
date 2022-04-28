import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  url = "http://localhost:8086";

  constructor(private router:Router,private http:HttpClient) { }

  login(credentials:any){
    return this.http.post(`${this.url}/users/authenticate`, credentials)
  }


  managerPing(){
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/users/managerping`,{'headers':header})
  }

  employeePing(){
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/users/employeeping`,{'headers':header})
  }

  adminPing(){
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/users/adminping`,{'headers':header})
  }


  logout()
  {
    console.log('loginService/logout')
    localStorage.removeItem("SessionUser");
    this.router.navigateByUrl("/welcome");
  }
}
