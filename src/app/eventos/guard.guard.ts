import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class GuardGuard implements CanActivate {
  
 user: Observable<firebase.User>;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.user = this.auth.authState;

    if(this.user == null){

     //  console.log(" not  login")
           this.router.navigate(['/home']);
         return true;
      
        
    }
    else{
      
     // console.log(" login")

       // this.router.navigate(['home']);
        return false;
       
    }
   
  }

  constructor(private auth:AngularFireAuth, private router:Router){}
}
