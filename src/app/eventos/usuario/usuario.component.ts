import { Component, OnInit,OnDestroy } from '@angular/core';
import { Form, NgForm} from "@angular/forms";
import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { EventosService } from '../services/eventos.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
