import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{DatePipe} from '@angular/common';

import {NgxPaginationModule} from 'ngx-pagination';
import { NgxQRCodeModule } from 'ngx-qrcode2';
//import { HttpClientModule } from '@angular/common/http';

import { routing} from './evento-routing.module';
import { ObjectoPipe } from './objecto.pipe';
import { LayoutModule } from '@angular/cdk/layout';
//import { CustomMaterialModule } from './custom-material/custom-material.module';

//import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { HomeComponent } from './home/home.component';
import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { DashboardEventosComponent } from './dashboard-eventos/dashboard-eventos.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { TemasComponent } from './temas/temas.component';
import { EmailComponent } from './email/email.component';
import { QuizzComponent } from './quizz/quizz.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
//import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ViewEventosComponent } from './view-eventos/view-eventos.component';
import {MatDialogModule} from "@angular/material";

//import * as admin from "firebase-admin";
import { SharedModule } from './../shared/shared.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChartsModule } from 'ng2-charts';
//guards
import { GuardGuard } from './guard.guard';
import { EventosService } from './services/eventos.service';
import { QuizzService} from './services/quizz.service';
import { UserService} from './services/user.service';
import { TemaService} from './services/tema.service';
import { PalestranteService } from './services/palestrante.service'
//
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    //HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    LayoutModule,
    FormsModule,ReactiveFormsModule,
    routing,
    SharedModule,
   // EventoRoutingModule
    //CustomMaterialModule,
    //MDBBootstrapModule.forRoot()
  ],
  declarations: [ 
    HeaderComponent,
    LoginComponent,
    CriarEventoComponent,
    HomeComponent,
    ListarEventosComponent,
    DashboardEventosComponent,
    ObjectoPipe,
    PalestrantesComponent,
    ParticipantesComponent,
    TemasComponent,
    EmailComponent,
    UsuarioComponent,
    SignUpComponent,
    QuizzComponent,
    EditarEventoComponent,
    /*NavBarComponent,*/
    ViewEventosComponent,
    /*PagamentoComponent,
    GooglePlacesDirective*/],
    providers: [GuardGuard,EventosService,
    			UserService,QuizzService,
    			TemaService,PalestranteService,
              DatePipe
              ],
})
export class EventosModule { }
