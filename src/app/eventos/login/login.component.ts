//import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { Form,NgForm} from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public email ;
  	public password;

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase,private router:Router,
   private userService:UserService) { }

  ngOnInit() {


   this.auth.authState.subscribe(
      (auth) => {

        if(auth == null) {

          this.router.navigate(['/eventos/login']);
          
       //  console.log("not log");
        }
        else {
           this.router.navigate(['/eventos/listarEventos']);
        // console.log("logado");
         
        }
      
    })
  }
    onSubmit(form:NgForm){
  	
    const email = form.value.email;
    const password=form.value.password;
  //	console.log(this.email + '   ' + this.password);
  
   // this.userService.login(email, password)
    


  this.auth.auth.signInWithEmailAndPassword(email,password)
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
        this.router.navigate(['listarEventos']);
       
      }else{
        this.auth.auth.signOut();
      }

    })
    .catch(err =>{
	
  	//  console.log('Dados errados!');
  	});
 
  }

}
