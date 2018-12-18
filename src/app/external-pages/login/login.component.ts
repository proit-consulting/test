import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,Form,NgForm } from '@angular/forms';

import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth:AngularFireAuth, private db:AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.auth.authState.subscribe(
      (auth) => {

        if(auth == null) {

          this.router.navigate(['/external/login']);
          
       //  console.log("not log");
        }
        else {
           this.router.navigate(['/eventos/listarEventos']);
        // console.log("logado");
         
        }
      
    })
  }

  login(): void {
    //this.router.navigate(['']);
    this.auth.auth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)
    /*.then(userData =>{
      if(userData.emailVerified){
        
        return this.userService.getUserFromDatabase(userData.uid);
        
      }else{
        const message = 'O seu email ainda não foi verificado!';
        //this.notifier.display('error', message);
        this.auth.auth.signOut();
      }
    })*/
    .then(userFromDatabase=>{
      if(userFromDatabase!=null){
        this.router.navigate(['']);
       
      }else{
        this.auth.auth.signOut();
      }

    })
    .catch(err =>{
  
    //  console.log('Dados errados!');
    });
 
  }

  register(): void {
    this.router.navigate(['/external/register']);
  }

  forgotPassword(): void {
    this.router.navigate(['/external/forgot-password']);
  }

}
