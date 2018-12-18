import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { Evento} from '../classes/evento';
import {Tema } from '../classes/tema';
import { DatePipe } from '@angular/common';
@Injectable()
export class TemaService {
    //data:Date = new Date();
  	constructor(private db: AngularFireDatabase,private firebaseAuth: AngularFireAuth,
               private datePipe: DatePipe) { }

  	//----------------------- Funções activas ou em uso ----------------------------
  	//Buscar temas
  	getTemas(): Observable<any> { 
   
    	return this.db.list('temas/').valueChanges();
  	}
  	//Adicionar tema
  	criarTema(nome,id){
	    var uid=this.db.createPushId();
	   	//  console.log(uid);
	    this.db.list('temas/').set(uid,{nometema:nome,uidevento:id,uidtema:uid})
      .then(evento_palestrante=>{
        var data=this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm'); 
        console.log(data)
        var mensagem='o tema: '+nome+' foi adicionado ao evento.'
      this.db.list('notificacao/'+id+'/').push({data:data,idevento:id,mensagem:mensagem})
    }).catch(error=>console.log('error'));;
  	}
  	//Adicionar palestrante ao tema
  	AddPalestTema(temaUid,uidpalestrante,nome,idevento,tema:Tema){
      console.log(temaUid,uidpalestrante,nome,tema)
    	this.db.list('temas/').update(temaUid,({ uidpalestrante:uidpalestrante,nomepalestrante:nome}))
      .then(evento_palestrante=>{
        var data=this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm'); 
        console.log(data)
        var mensagem='O palestrante '+nome +' foi adicionado ao tema: '+ tema.nometema +'.';
      this.db.list('notificacao/'+idevento+'/').push({data:data,idevento:idevento,mensagem:mensagem})
    }).catch(error=>console.log('error'));
  	}

  	//----------------------- fim Funções activas ou em uso ------------------------
  	//--------------------- Funções inativas ---------------------------------------


}
