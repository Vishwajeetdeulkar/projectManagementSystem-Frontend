import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './services/authguard.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authguardService:AuthguardService ,private router:Router ) {}

  canActivate():boolean
  {
    if(!this.authguardService.getToken()){
      this.router.navigateByUrl("/welcome");
    }
    return this.authguardService.getToken();
  }
  
}
