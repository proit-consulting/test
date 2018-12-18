import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';
import { TemaService } from '../services/tema.service';
import { Evento} from '../classes/evento';
 
@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  id:string;
  evento;
  Evento:Evento=new Evento();

   constructor(private servEventos:EventosService, private route:ActivatedRoute,private servTemas:TemaService,private db: AngularFireDatabase) { 

      this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
     // console.log(params);
    })
              }

  ngOnInit() {
    this.servEventos.getEventos().subscribe(item=>{
      //this.evento=
      item.filter(item=>{
        if(item.id==this.id){
          console.log(item);
          this.eventoData(item);
          //return true;
        }
      });
    });
  }
  eventoData(item){
    //this.Evento.id=item.id;
     this.Evento=item;

  }
  Editar(){
    this.servEventos.editarEvento(this.Evento,this.id);
  }

}
