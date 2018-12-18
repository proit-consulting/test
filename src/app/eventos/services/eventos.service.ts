import { error } from 'util';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
//import { combineLatest } from 'rxjs/operators';
import { Palestrante} from '../classes/palestrante';
import { Evento} from '../classes/evento';
import { Upload } from '../classes/upload';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { DatePipe } from '@angular/common';

@Injectable()


export class EventosService {

  constructor(private db: AngularFireDatabase,private firebaseAuth: AngularFireAuth,
    private datePipe: DatePipe) { }

 getEventos(): Observable<any> {
   
    return this.db.list('eventos/').valueChanges();

  }
  editarEvento(evento:Evento,id){

      this.db.list('eventos/').update(id,evento).then(evento=>{
        var data=this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm'); 
        console.log(data)
        var mensagem='Dados do evento alterado.'
      this.db.list('notificacao/'+id+'/').push({data:data,idevento:id,mensagem:mensagem})
    }).catch(error=>console.log('error'));
  }
  enviarConvite(idEvento,chaveAut){

    const data={[chaveAut]:false};

    this.db.object('convites/'+idEvento +'/').update(data)
  }
  CriarEvento(evento:Evento){
    var uid=this.db.createPushId();
    evento.id=uid;
    this.db.list('/eventos/').set(uid,evento).then(evento=>{
        var data=this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm'); 
        console.log(data)
        var mensagem='Novo evento Adicionado.'
      this.db.list('notificacao/'+uid+'/').push({data:data,idevento:uid,mensagem:mensagem})
    }).catch(error=>console.log('error'));

  }
  
  criarPalestrante(palestrante:Palestrante,id){
     var uid=this.db.createPushId();
   //  console.log(uid);
   palestrante.uidpalestrante=uid;
    this.db.list('palestrantes/').set(uid,palestrante).then(evento_palestrante=>{
      this.db.list('evento_palestrantes/').push({nomepalestrante:palestrante.nome,uidevento:id,uidpalestrante:uid})
    }).catch(error=>console.log('error'));
  }
 
/*  AddPalestrante(idpalestrante,nomepalest,id){
     var uid=this.db.createPushId();
      this.db.list('evento_palestrantes/').set(uid,{uidpalestrante:idpalestrante,uidevento:id,nomepalestrante:nomepalest})
  }*/

  getParticipantes(idevento): Observable<any> {
   
    return this.db.list('evento_participantes/'+idevento).valueChanges();

  }
  getParticipantes1(): Observable<any> {
   
    return this.db.list('evento_participantes/').valueChanges();

  }

   getPalestrante(): Observable<any> {
   
    return this.db.list('evento_palestrantes/').valueChanges();

  }
 

  getParticipantesEvento(idEvento): Observable<any> {

   // const uidvalue="";
   
    const eventos_participante=this.db.list('teste/evento_participante/'+idEvento).snapshotChanges()
    const participantesE=eventos_participante;
    eventos_participante.map(participantes=>{
       participantes.map(participante=>{
       this.db.object('teste/participantes/'+participante.key).valueChanges()
       })
    })
    .map(todos=>Observable.merge())
   return participantesE;

    /* participantesE.subscribe(ep=> ep.forEach(val=>{ 
       
    console.log(val.key)}))*/
  // return Observable.of([]);

  }
  getParticipantesEvento2(idEvento): Observable<any> {

   // const uidvalue="";
   
    const eventos_participante=this.db.list('teste/evento_participante/'+idEvento).snapshotChanges()
    const participantesE=eventos_participante;
    eventos_participante.map(participantes=>{
       participantes.forEach(val=>{ 
  console.log( val.key)
    return this.db.object('teste/participantes/'+val.key).valueChanges()
    })
    })
    .map(todos=>Observable.merge())
   //return participantesE;

    /* participantesE.subscribe(ep=> ep.forEach(val=>{ 
       
    console.log('test '+ val.key)}))*/
  return Observable.of([]);

  }

 /* getep(id){
    return this.db.list('teste/evento_participante/'+id).snapshotChanges()
    .map(actions=>{
      for(let action of actions){
        return actions.map(action=>({key1:this.db.object('teste/participantes/'+action.key).valueChanges()
         ,...action.payload.val()}));
      }
      console.log(actions)
     // return actions
    })
  }*/
  

}
