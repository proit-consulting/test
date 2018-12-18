import { normalizeMethodName } from '@angular/http/src/http_utils';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Form, NgForm,FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { TemaService } from '../services/tema.service';
import { Observable } from 'rxjs/Observable';
import { Palestrante} from '../classes/palestrante';
import { Tema} from '../classes/tema';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
 
  p: number ;
  id:string;
  tema:Tema= new Tema();
  private sub:any;
  participantes;
  public normalizeMethodName ;
	public descricao;
  temas;
  palestrantes;
  palestUid;
  temaUid;
  nome;
  
  constructor(private servEventos:EventosService, private route:ActivatedRoute,
              private servTemas:TemaService,private db: AngularFireDatabase) {
    
    this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
      console.log(params);
    })
  }

  ngOnInit() {
    //numero pagina init
    this.p = 1;

    this.servTemas.getTemas().subscribe(val =>{

      this.temas= val.filter(item=>{

           // console.log(item.uidevento + this.id)
        if(item.uidevento==this.id){
          return true;
        }
      });

      this.db.list('eventos/').update(this.id,({ temas:this.temas.length}));
        
    });

    //this.participantes= this.servEventos.getParticipantes1();

    this.servEventos.getPalestrante().subscribe(val =>{
      this.palestrantes=val.filter(item=>{

        if(item.uidevento==this.id){
          return true;
        }
      });
    });
  }

  onSubmit(form:NgForm){
  	
    const nome = form.value.nome;
   // const descricao=form.value.descricao;

    this.servTemas.criarTema(nome,this.id);
    $("#myModal input").val("");

    $("#myModal #closebtn").click()
 
  }

  show(value){
    // (<HTMLInputElement>document.getElementById('textbox')).value=value;
    this.palestUid=value;
    //  console.log(this.palestUid)  
  }

  gettema(uidTema,tema){
    this.temaUid=uidTema;
    this.tema=tema;
    //this.db.list('temas/').update(uidTema,({ uidpalestrante:this.temas.length}));
  }

  AddPalest(){
    this.servTemas.AddPalestTema(this.temaUid,this.palestUid.uidpalestrante,this.palestUid.nomepalestrante,this.id,this.tema);
    this.palestUid='';
    // this.db.list('temas/').update(this.temaUid,({ uidpalestrante:this.palestUid.uidpalestrante, nomepalestrante:this.palestUid.nome})).then(
    //   p=>this.palestUid=''
    // );

   // this.servEventos.AddPalestrante(this.palestUid.uidpalestrante,this.palestUid.nome,this.id)
     
   /*
     this.servEventos.getPalestranteAll().subscribe(val =>{
      val.filter(item=>{
 if(item.uidpalestrante==this.palestUid){

    this.db.list('temas/').update(this.temaUid,({ uidpalestrante:this.palestUid.uidpalestrante, nomepalestrante:this.palestUid.nome}));
           console.log(item.nome)
         }

      });
    })*/

  }

}
