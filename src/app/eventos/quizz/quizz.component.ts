import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import * as $ from 'jquery';

import {Chart} from 'chart.js';
import * as firebase from 'firebase/app';
import { QuizzService } from '../services/quizz.service';
import { Observable } from 'rxjs/Observable';
import { Quizz } from '../classes/quizz';
import * as moment from 'moment';
//import {ChartsModule, Color} from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import{DatePipe} from '@angular/common';


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

    @ViewChild('pie-chart') chartPie: BaseChartDirective;
 

p:number;
// grafico Pie
especialList;
especialCount=[];
pieChartData;
especialtodas=[];
type1 ='doughnut';
 options1;
datasets1;
labels1;
PieColors:Array<any> = [{
   backgroundColor: ['#17a2b8','#dc3545',  '#20c997','#6c757d'],
    //borderColor: '#007bff'
}];

especialidade;
especPesquisa:any=[];




	 //empList: Array<Custom> = [];
	id:string;
    private sub:any;
    questoes;
    nome:string;
    quizz:Quizz= new Quizz();
  questoesObservable: Observable<any[]>;	



  constructor(private servQuizz:QuizzService, private route:ActivatedRoute,private datapipe : DatePipe,
  	private db: AngularFireDatabase) { 
  		this.route.parent.params.subscribe(params=>{
      this.id=params["id"];
     // console.log(params);
    })
  }

  

  ngOnInit() {
   this.p=1
  	this.questoesObservable=this.servQuizz.getQuestoes(this.id);
    
    
  }


  addPergunta(){

    this.servQuizz.criarPergunta(this.quizz,this.id);
  }


//Grafico..................................................
  infoPergunt(pergUid){
  this.servQuizz.respEstatistica(pergUid,this.id).subscribe((res)=>{
    this.piaChart(res)
      console.log(res);
      })

  }



piaChart(values){
  this.especialCount=[];
  this.especialtodas=[];

 values.forEach(element => {
   this.especialList=element.resposta;
   

    if(this.especialCount[this.especialList]){
   
        this.especialCount[this.especialList] +=1;
     
        }else{
          this.especialCount[this.especialList] =1;
        }
 })

  for (var key in this.especialCount){
   

    let val = {
      labels:key,
      values: this.especialCount[key]
    }

    this.especialtodas.push(val)
    //console.log(this.especialtodas)
  }
 
 // this.ng2Graph1(this.especialtodas);
  this.pieChart(this.especialtodas)
}


pieChart(dados){
  
 var bar_chart= new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
       labels: dados.map(d=>d.labels),
       
      datasets: [{
        label: dados.map(d=>d.labels),
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
         
        data: dados.map(d=>d.values)
      }]
    },
    options: {
       legend: { position: 'left' },
      

      
     // onClick: (evt, element) =>{ //em vez de uzar o onCluck com function usamos assim, para poder usar uma funcão dentro
     /* var activePoints = bar_chart.getElementAtEvent(evt);
     
      this.especialidade=activePoints[0]._model.label;
       console.log(this.especialidade);*/
       //this.especialidades(this.especialidade);
     /* this.GeoService.getMarcacao().subscribe( value =>{

this.especPesquisa=value.filter(item=>item.especialidade==this.especialidade)
      console.log(this.especPesquisa)
      $('#modalEvent').click();
    })
     
    }*/
    }
});

this.reloadChart1();
}

reloadChart1() {
    if (this.chartPie !== undefined) {
      /* this.chartPie.chart.destroy();
       this.chartPie.chart = 0;*/

       this.chartPie.datasets = this.datasets1;
      // this.chartPie.data=this.data1;
       this.chartPie.labels = this.labels1;
      this.chartPie.ngOnInit();
       //this.chartPie.chart.update();

}

    
}


}
