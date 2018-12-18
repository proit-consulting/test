import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { environment } from './../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AppComponent } from './app.component';
import { EventosModule } from './eventos/eventos.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    LayoutsModule,
    //EventosModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
      private matIconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) {
    // Register Font Awesome
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    // Register layout icon SVGs
    matIconRegistry.addSvgIcon('classic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/classic.svg')
    );
    matIconRegistry.addSvgIcon('toolbar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/toolbar.svg')
    );
    matIconRegistry.addSvgIcon('compact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/compact.svg')
    );
    matIconRegistry.addSvgIcon('boxed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/boxed.svg')
    );
    matIconRegistry.addSvgIcon('funky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/funky.svg')
    );
    matIconRegistry.addSvgIcon('tabbed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/tabbed.svg')
    );
  }
}
