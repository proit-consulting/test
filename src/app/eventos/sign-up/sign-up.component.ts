import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import * as  firebase from 'firebase';
import { UserService} from '../services/user.service';
import {Router} from '@angular/router';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	nome:string;
  email:string;
  password:string;
  tipo:string;

  constructor(public auth: AngularFireAuth,private db: AngularFireDatabase,
                private userService:UserService,private router: Router) { }

  ngOnInit() {
  	/*this.auth.authState.subscribe(
      (auth) => {

        if(auth == null) {

          this.router.navigate(['/login']);
          
       //  console.log("not log");
        }
        else {
           this.router.navigate(['/listarEventos']);
        // console.log("logado");
         
        }
      
    })*/
  }
  onSubmit(form:NgForm){
  	const fullname=form.value.nome;
  	const email=form.value.email;
  	const password=form.value.password;
    //const tipo=form.value.tipo;
    const tipo='indefinido';

  	this.userService.cadastrarUser(fullname,email,password);
  }

}
