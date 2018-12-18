import { CanActivate } from '@angular/router/router';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//import { AppComponent } from './app.component';
import { GuardGuard } from './guard.guard';

import { LoginComponent } from './login/login.component';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { DashboardEventosComponent } from './dashboard-eventos/dashboard-eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { TemasComponent } from './temas/temas.component';
import { EmailComponent } from './email/email.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QuizzComponent } from './quizz/quizz.component';

import { EditarEventoComponent } from './editar-evento/editar-evento.component';

import { HomeComponent } from './home/home.component';
import { ViewEventosComponent } from './view-eventos/view-eventos.component';
//import { PagamentoComponent } from './pagamento/pagamento.component';

const appRoutes: Routes=[
     //{path:'',redirectTo:'listarEventos', pathMatch:'full'},
     {path:'home', component: HomeComponent},
     {path:'signup', component: SignUpComponent},
     {path:'login', component: LoginComponent},
     //{path:'criarEvento', component: CriarEventoComponent},
     //{path:'pagamento', component: PagamentoComponent},
     {path:'listarEventos', component: ListarEventosComponent},
     {path:'Usuario', component: UsuarioComponent},
    //{path:'view-Evento', component: ViewEventosComponent },
     {path:'HomeEventos/:id', component: DashboardEventosComponent,
          children:[
            {path:'',redirectTo:'temas', pathMatch:'full'},
            {path:'palestrantes', component: PalestrantesComponent},
            {path:'participantes', component: ParticipantesComponent},
            {path:'temas', component: TemasComponent},
            //{path:'email', component: EmailComponent },
            {path:'quizz', component: QuizzComponent },
            {path:'editarEvento', component: EditarEventoComponent }
          ]
       },
  {
    path: 'external',
    loadChildren: '../external-pages/external-pages.module#ExternalPagesModule'
  }
     //{path:'**',redirectTo:'listarEventos'}
];
export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);

/* @NgModule({
  imports: [
    //RouterModule.forRoot(appRoutes,{useHash:true}),
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class EventoRoutingModule { }*/	
