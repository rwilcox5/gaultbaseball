import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SituationComponent } from './situation';

@NgModule({
  declarations: [
    SituationComponent,
  ],
  imports: [
    IonicPageModule.forChild(SituationComponent),
  ],
  exports: [
    SituationComponent
  ]
})
export class SituationComponentModule {}
