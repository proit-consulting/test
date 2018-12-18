import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Form,NgForm} from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase,private router:Router,
   private userService:UserService) { }

  ngOnInit() {


   this.auth.authState.subscribe(
      (auth) => {

        if(auth != null) {

           this.router.navigate(['/listarEventos']);
        }
      
    })
  }

}
