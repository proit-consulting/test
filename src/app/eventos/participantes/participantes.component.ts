import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  id:string;
  private sub:any;
  participantes;
  participantesObservable: Observable<any[]>;
  constructor(private servEventos:EventosService, private route:ActivatedRoute,private db: AngularFireDatabase) { 
     this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
     // console.log(params);
    })
  }


  ngOnInit() {

    this.getParticipantes();
    this.participantesObservable=this.servEventos.getParticipantes(this.id);
    this.participantesObservable.subscribe(item=>{
      this.db.list('eventos/').update(this.id,({ participantes:item.length}));  
    })
    
  }
  getParticipantes(){
    this.servEventos.getParticipantes1().subscribe(val =>{

         this.participantes=val.filter(item=>{

          // console.log(item.uidevento + this.id)
         if(item.uidevento==this.id){
          
           return true;
         }
         
      });
     // console.log( this.participantes.length)
     this.db.list('eventos/').update(this.id,({ participantes:this.participantes.length}));
     })
  }
}
