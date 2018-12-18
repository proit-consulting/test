import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class UserService {
    currentUser: User;
    user: Observable<firebase.User>;
    authState: any = null;perfil:any=[];

    constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { 

    	this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  	this.user = afAuth.authState;
     this.afAuth.authState.subscribe(auth => {
                  if (auth) {
                    this.currentUser = new User(auth)
                    return this.db.object(`/usuario/${auth.uid}`).valueChanges().subscribe(user=>{
                      if(user){
                        this.perfil=user;
                      }else{
                        this.perfil=[];
                      }
                    });
                  } else return [];
                })
               /* .subscribe(user => {
                    this.currentUser['username'] = user.name
                })*/
    }

    //myfire
	getUserFromDatabase(uid){
	  	const ref = this.db.database.ref('usuario/'+ uid);
	  	return ref.once('value')
	  	.then(snapshot => snapshot.val());
	}
    checkIfUserExists(userId) {
	   const ref = this.db.database.ref('usuario/'+ userId);
	   ref.child(userId).once('value', function(snapshot) {
	    var exists = (snapshot.val() !== null);
	    //userExistsCallback(userId, exists);
	  });
	}
    
    //user
   /* admin:boolean=false;
  set(userFromDatabase){
  	localStorage.setItem('user',JSON.stringify(userFromDatabase));
    localStorage.setItem('admin',userFromDatabase.tipo);
  }*/
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  loggedIn():boolean{
  	if(this.afAuth.auth.currentUser){
  		return true;
  	}
  }
  /*loggedAdmin():boolean{//userFromDatabase
    const current=localStorage.getItem('admin');
    if(current!='undefined' && current == 'admin') {
     return true;
    }
    else{
      return false;
    }*/
     /*if(userFromDatabase.tipo=='admin'){
       this.admin=true;
          //return true;
          //console.log(this.userService.admin)
        }
        else{
          //this.userService.admin=false;
          this.admin=false;
         // return false
        }*/
  //}
  /*getProfil(){
  	const user=localStorage.getItem('user');
  	return JSON.parse(user);
  }
  destroy(){
  	localStorage.removeItem('user');
    localStorage.removeItem('admin');
  }*/
  listar(): Observable<any[]>{
    return this.db.list('usuario').valueChanges();
  }
  cadastrarUser(nome,email,password){

  	this.afAuth.auth.createUserWithEmailAndPassword(email,password)
  	.then((user)=>{

      user.user.sendEmailVerification();
      const message=`Mensagem de verificação enviada para ${email}. Verifique a sua caixa de email e siga as instruções`;
      //this.notifier.display('success', message);
      
      return this.db.database.ref('usuario/' +  user.user.uid).set({
        email:email,
        uid: user.user.uid,
        registrationDate:new Date().toString(),
        nome:nome,
        //tipo:tipo
      })
      .then(()=>{
        this.afAuth.auth.signOut();
      });
  		//console.log(userData);
  	})
  	.catch( err=>{
      //this.notifier.display('error', err.message);
  		console.log(err);
  	});

  }
}
export class User {
  uid: string;
  name: string = "";
  constructor(auth) {
    this.uid = auth.uid
  }


}
