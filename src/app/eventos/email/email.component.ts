import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from "@angular/forms";
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';


//var admin = require("firebase-admin");
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  form: FormGroup;
  id;
  chave;
  nomeevento;
 public xqrcode:string=null;
 elementType : 'url' | 'canvas' | 'img' = 'url';
value : string = 'https://www.google.com/';
uid;
 participantes=[];


  constructor(private fb: FormBuilder,private af: AngularFireDatabase,private servEventos:EventosService, private route:ActivatedRoute,private db: AngularFireDatabase) {
     
    this.createForm();
     this.xqrcode='https://www.google.com/';
   }

  ngOnInit() {
    
 this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
    })
    //console.log(this.id)

   /*  this.servEventos.getEventos().subscribe(item=>{
   item.filter(item=>{
         if(item.id==this.id){
           this.chave=item.id;
           
          
           return true;
         }

         })
});*/
//this.servEventos.getParticipantesEvento2(this.id);

this.servEventos.getParticipantesEvento(this.id).subscribe(ep=>{
  
  this.participantes=[];
   ep.forEach(val=>{ 
  this.uid=val.key;
  console.log( val.value)
    this.db.list('participantes/'+val.key).valueChanges().subscribe(val=>
    {
      this.participantes.push(val);
//console.log( participantes)
    });

  /*   if("ywYIMxqG3YOOYvafkZL3KaZdydi1"==this.uid){
 console.log( this.uid)
  this.db.list('teste/evento_participante/'+this.id).valueChanges().subscribe(val=>
    {
console.log("participantes:  "+val)
    });
     }*/
       
    })
    
console.log( this.participantes)
})

   

      if("ywYIMxqG3YOOYvafkZL3KaZdydi1"==this.uid){
    this.db.object('teste/evento_participante/'+this.id).valueChanges().subscribe(val=>
    {
console.log("participantes:  "+val)
    });
    }else{
      console.log("diferente")
    }
  }


createForm() {
  
    this.form = this.fb.group({
      
      name: ['', Validators.required],
      email: ['', Validators.required],
     
    });
  }

   onSubmit(){
      

    const chavealeatoria= this.db.createPushId();
   const {name, email} = this.form.value;
    const date = Date();
    const chave =  this.id;
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      
    `;
    let formRequest = { name, email, date, html,chave,chavealeatoria};
    this.af.list('/messages').push(formRequest);

    this.servEventos.enviarConvite(chave,chavealeatoria);
    this.form.reset();

  }

  
}
