//import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Form, NgForm,FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';
import { Palestrante} from '../classes/palestrante';
@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.css']
})
export class PalestrantesComponent implements OnInit {

  id:string;
  private sub:any;
  palestrantes;
  palestrante:Palestrante= new Palestrante();
 constructor(private servEventos:EventosService, private route:ActivatedRoute,private db: AngularFireDatabase) { 
     this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
    //  console.log(params);
    })
  }

  ngOnInit() {
    const ep=this.servEventos.getParticipantesEvento(this.id)
    ep.subscribe(e=>console.log(e))
    this.servEventos.getPalestrante().subscribe(val =>{

         this.palestrantes=val.filter(item=>{

         //  console.log(item.uidevento + this.id)
         if(item.uidevento==this.id){
         
           return true;
         }
         
      });
 //console.log( this.palestrantes.length)
     this.db.list('eventos/').update(this.id,({ palestrantes:this.palestrantes.length}));
  

       
        
     })
  }
  addPalestrante(form:NgForm){
   // console.log(this.palestrante)
    this.servEventos.criarPalestrante(this.palestrante,this.id)
  }
  

}
