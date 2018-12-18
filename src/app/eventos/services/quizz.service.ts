import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { Evento} from '../classes/evento';
import { Quizz } from '../classes/quizz';

@Injectable()
export class QuizzService {

	constructor(private db: AngularFireDatabase,private firebaseAuth: AngularFireAuth) { }

	//----------------------- Funções activas ou em uso ------------------------
	//Buscar questões
	getQuestoes(idEvento): Observable<any> { 
	   
	 	return this.db.list('quizz/'+idEvento).valueChanges();
	}
	//Adicionar pergunta
	criarPergunta(quizz:Quizz,id){
	     var uid=this.db.createPushId();
	   //  console.log(uid);
	   quizz.uidpergunta=uid;
	    this.db.list('quizz/'+id).set(uid,quizz);
	}



	respEstatistica( pergId, eventId): Observable<any> {
   
    return this.db.list('/teste/quiz_resposta/'+eventId +'/'+pergId,ref => 
    	ref.orderByChild('resposta')).valueChanges();

		//colocar a funcao p ir pegar os dados das respostas

	}
	//----------------------- Fim Funções activas ou em uso --------------------

	//--------------------- Funções inativas -----------------------------------
	//buscar opções
	getOpcoes(idquestao): Observable<any> { 
	    return this.db.list('opcoes/'+idquestao).valueChanges();
	}

}
