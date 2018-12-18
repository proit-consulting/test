import { Component, OnInit, Input } from '@angular/core';

import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router, RouterModule, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'portal-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  constructor(private firebaseAuth: AngularFireAuth,private router: Router,
  	//private servEventos:EventosService, 
  	private route:ActivatedRoute) { }

  	public login: boolean=false;
  ngOnInit(): void {
  }

  logout() {

    this.firebaseAuth.auth.signOut();
    this.login=false;
     
    this.router.navigate(['external/login']);
  }
}
