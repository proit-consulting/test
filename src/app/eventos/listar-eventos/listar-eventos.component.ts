import { forEach } from '@angular/router/src/utils/collection';
import { observable } from 'rxjs/symbol/observable';
//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { EventosService } from '../services/eventos.service';
@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {

  p: number ;
 eventonome;

  constructor(private servEventos:EventosService, private firebaseAuth: AngularFireAuth,private db:AngularFireDatabase,private router: Router) { }
  eventos: Observable<any[]>;
  eventos1;
  ngOnInit() {
 this.p = 1;

     this.firebaseAuth.authState.subscribe(
      (auth) => {

        if(auth == null) {
         
          this.router.navigate(['/login']);
          
       //  console.log("not log");
        }
        else {

         // this.db.list('eventos/'+auth.uid+'/'+'-LG_QKEdmn-fGIjgVYwQ').valueChanges().subscribe( val => console.log(val))
          
         //this.router.navigate(['/listarEventos']);
       

  
        // console.log(auth.uid)
        // this.eventos=this.db.list('eventos/'+auth.uid).valueChanges();
           this.eventos=this.db.list('eventos/').snapshotChanges().map(actions=>{
      return actions.map(action=>({key:action.key,...action.payload.val()}));
    })
       this.servEventos.getEventos().subscribe(val =>{

         //  console.log(auth.uid)
         this.eventos1= val.filter(item=>{
         if(item.criadorId==auth.uid){
         //  console.log(item.criadorId);
           return true;
         }
         
      });
        
        }
         )
      
        // this.eventos=this.db.list('eventos/'+auth.uid).valueChanges();
       //  console.log("logado",auth.uid);
         
        }
      
    })

    
  }
  tempo(data){
    moment.locale('pt');
    var temp=moment(data,'YYYYMMDD').fromNow();
    return temp;
  }
  home(){
this.router.navigate(['/HomeEventos']);
  }


}
