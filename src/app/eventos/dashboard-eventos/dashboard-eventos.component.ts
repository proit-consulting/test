import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';
import { TemaService } from '../services/tema.service';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-eventos',
  templateUrl: './dashboard-eventos.component.html',
  styleUrls: ['./dashboard-eventos.component.css']
})
export class DashboardEventosComponent implements OnInit {
   public id:string;
  private sub:any
  temas;
  temas1: Observable<any[]>;
  nomeevento;
  participantes;
  participantes1: Observable<any[]>;
  //sidenav
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    

  constructor(private servEventos:EventosService, private route:ActivatedRoute,
              private servTemas:TemaService,private db: AngularFireDatabase,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

if($('#collapse1').is('.collapse:not(.show)')) {
  //  console.log("aberto")
}

    this.sub=this.route.params.subscribe(params=>{

      this.id=params["id"];
     
    })

   

if(this.id){
 //  console.log(this.id)

//this.teste();
   this.servEventos.getEventos().subscribe(item=>{
   this.nomeevento=item.filter(item=>{
         if(item.id==this.id){
           console.log(item)
           return true;
         }

         })
});


// const ref = this.db.database.ref('participantes/1/');
/* var ref = firebase.database().ref("participantes/2/" + this.id);
ref.once("value")
  .then(function(snapshot) {
   if(snapshot.exists()){
     console.log("existe")
   } 
   else{
     console.log("n existe")
   }
  });*/


this.participantes1=this.servEventos.getParticipantes(this.id);
this.servEventos.getParticipantes1().subscribe(val =>{

           
         this.participantes= val.filter(item=>{

         if(item.uidevento==this.id){
           //console.log(item)
           return true;
         }

         })
       //  console.log("participantes"+ this.participantes)
         
      });
      this.temas1=this.servTemas.getTemas();
      this.servTemas.getTemas().subscribe(val =>{

           
         this.temas= val.filter(item=>{
         if(item.uidevento==this.id){
         //  console.log(item)
           return true;
         }

         })
         
      });
}

  } 
  

    ngOnDestroy(){
    this.sub.unsubscribe();
  }


  add(){
    var nome=(<HTMLInputElement>document.getElementById('nome')).value; 
     var uid=this.db.createPushId();
   //  console.log(uid);
    this.db.list('evento_participantes/').set(uid,{nomeparticipante:nome,uidevento:this.id, idparticipante:1});
  (<HTMLInputElement>document.getElementById('nome')).value="";

  }


   teste(){
   this.db.list('participantes/').snapshotChanges().map(actions=>{
      actions.map(action=>{({key:action.key,...action.payload.val()
      }
      ) ;
    //  console.log('hdh', action.key);
    return  this.participantes1=this.db.list('participantes/'+action.key+'/'+this.id).valueChanges();
     
    }
      );
      
    });
   
   }
   
}
