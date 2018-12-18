import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from './../../shared/shared.module';

import { MapsComponent } from './maps/maps.component';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUBMxehoelhfxTDaVxV2MIm6L1ptcJzpU'
    }),
  ],
  declarations: [MapsComponent]
})
export class MapsModule { }
