import { Component, OnInit } from '@angular/core';

import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router, RouterModule, ActivatedRoute } from "@angular/router";

import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public login: boolean=false;
  eventos;
   public id:string;
  private sub:any;

  constructor(private firebaseAuth: AngularFireAuth,private router: Router,
    private servEventos:EventosService, private route:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router.config);
     this.firebaseAuth.authState.subscribe(
      (auth) => {

        if(auth == null) {
          this.login=false;

          this.router.navigate(['/home']);
           $(".topnav").hide();
           $(".navbar").hide();
        // console.log("not log");
        }
        else {
          this.login=true;
           $(".topnav").show();
           $(".navbar").show();
          // this.router.navigate(['/home']);
        // console.log("logado");
         
        }
      
    })

    this.sub=this.route.params.subscribe(params=>{

      this.id=params.id;
     
    })
    this.servEventos.getEventos().subscribe(item=>{
      this.eventos=item.filter(item=>{
        if(item.id==this.id){
          // console.log(item)
          return true;
        }
      })
    });
  }

  logout() {

    this.firebaseAuth.auth.signOut();
    this.login=false;
     
    this.router.navigate(['/external/login']);
    // $(".mobile-menu").hide();
    // $("#menu .close").click()
    $(".topnav").hide();
  }

}
