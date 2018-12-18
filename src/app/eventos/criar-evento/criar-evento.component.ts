
import { observable } from 'rxjs/symbol/observable';
import { Component, OnInit, NgZone  } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { EventosService } from '../services/eventos.service';
import { Upload } from '../classes/upload';
import { Evento} from '../classes/evento';
//import 'rxjs/add/operator/finalize';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.css']
})
export class CriarEventoComponent implements OnInit {

//maps
public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  
  //Method to be invoked everytime we receive a new instance 
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }
//-----------
  criadorId:string;
  color;
  border;
  eventoColor;
  banner;
  evento:Evento= new Evento();
  selectedFiles:FileList;
  teste:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private zone: NgZone,private fb: FormBuilder, private firebaseAuth: AngularFireAuth,private db:AngularFireDatabase,
    private router: Router,private servEventos:EventosService,private afStorage: AngularFireStorage) { }

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  ngOnInit() {
  //  document.getElementById("openModalButton").click();
    this.firebaseAuth.authState.subscribe(
      (auth) => {

        if(auth == null) {
         
         // this.router.navigate(['/login']);
          
        // console.log("not log");
        }
        else {
          this.evento.criadorId=auth.uid;
        // console.log(this.criadorId)
        }
      
    })
  }
  
  detectFiles(event){
    this.selectedFiles=event.target.files;
    /*const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }*/
   // this.evento.banner=event.target.value;
  }
   upload() {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.selectedFiles.item(0));
    this.uploadProgress = this.task.percentageChanges();
    /*this.downloadURL = this.task.downloadURL();
   this.task.downloadURL().subscribe((value)=>{
      this.evento.banner=this.task.task.snapshot.downloadURL
       console.log(this.evento.banner)
    });*/

   this.task.snapshotChanges().pipe(
    finalize(() => {
      this.downloadURL = this.ref.getDownloadURL()
      this.downloadURL.subscribe(url => {
        console.log(url);
        this.evento.banner=url;
        this.servEventos.CriarEvento(this.evento);

      });
    })
  )
  .subscribe();
  }
  criarEvento(){
    this.evento.palestrantes=0;
    this.evento.participantes=0;
    this.evento.temas=0;
    this.upload();
    //this.servEventos.CriarEvento(this.evento);
  }
  addEsp(){
  /*let file=this.selectedFiles.item(0);
    let uniqkey='event' + Math.floor(Math.random()*1000000);
    const uploadTask=this.storage.upload(uniqkey,file);
    //this.uploadProgress=uploadTask.percentageChanges();
    uploadTask.downloadURL().subscribe((value)=>{this.evento.banner=uploadTask.task.snapshot.downloadURL;
    console.log(this.evento.banner);
    });*/
 
  //var nome=(<HTMLInputElement>document.getElementById('nome')).value;
  //var data=(<HTMLInputElement>document.getElementById('data')).value;
  
    this.evento.palestrantes=0;
    this.evento.participantes=0;
    this.evento.temas=0;
    if (this.selectedFiles.length !=null) {
      // code...
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(id);
      this.task = this.ref.put(this.selectedFiles.item(0));
      this.uploadProgress = this.task.percentageChanges();
     /* this.downloadURL = this.task.downloadURL();
      this.task.downloadURL().subscribe((value)=>{
      this.evento.banner=this.task.task.snapshot.downloadURL
        console.log(this.evento.banner)
        this.servEventos.CriarEvento(this.evento); 
      });*/
    }
    else{
      console.log('Vazio');
    }
  
    //this.db.list('/eventos/').set(uid,{nomeevento:nome,id:uid,data:data,palestrantes:0,participantes:0, temas:0,criadorId:this.criadorId,eventoColor:this.eventoColor,banner:this.banner});
    (<HTMLInputElement>document.getElementById('nome')).value="";
    (<HTMLInputElement>document.getElementById('data')).value="";
    //console.log("adicionado")
    //$('#modalAd').click();
  

}

cor(value){
  this.evento.eventoColor=value
  this.border='2px solid '+value
}

escolhaTema(value){

  if(value=="Azul"){
    this.evento.eventoColor= "#00a3e8"; //Azul;
    this.evento.banner="https://firebasestorage.googleapis.com/v0/b/gesteventos-f5789.appspot.com/o/banner1.jpg?alt=media&token=af1e3b9c-acec-4405-8c60-8ebacd42a160";

  } else if(value=="Cinza"){
 this.evento.eventoColor= "#7f7f7f"; //cinza
this.evento.banner="https://firebasestorage.googleapis.com/v0/b/gesteventos-f5789.appspot.com/o/banner3.jpg?alt=media&token=0ef0baa2-2b25-46ce-9057-ad31aedda649"

  }else if(value=="Verde"){
 this.evento.eventoColor= "#23b14d"; //verde
 this.evento.banner="https://firebasestorage.googleapis.com/v0/b/gesteventos-f5789.appspot.com/o/banner2.jpg?alt=media&token=b2232a8a-8eb9-4017-bbdf-834a31b351e2"
  }

 // console.log(value)
 
   
}
//fake url to preview in img
eadUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      var teste;
      this.teste= (<FileReader>event.target).result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
}
//validação input file
onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length >0) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
}
}
