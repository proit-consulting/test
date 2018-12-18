import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewEventosDataSource } from './view-eventos-datasource';
//import { AngularFireDatabase } from 'angularfire2/database'; 
import { AngularFireDatabase} from '@angular/fire/database';

import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { EventoI} from '../classes/evento';

@Component({
  selector: 'view-eventos',
  templateUrl: './view-eventos.component.html',
  styleUrls: ['./view-eventos.component.css']
})
export class ViewEventosComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewEventosDataSource;

  constructor(private db: AngularFireDatabase) {
 
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nomeevento'];
  subscription: Subscription;
 
  ngOnInit() {
     this.subscription = this.db.list<EventoI>('eventos/').valueChanges().pipe(first()).subscribe(d=>{
      console.log('data streaming',d);
      this.dataSource = new ViewEventosDataSource(this.paginator, this.sort); 
      this.dataSource.data = d;
    });   
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
