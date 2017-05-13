import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PitchesinfoComponent } from './pitchesinfo';

@NgModule({
  declarations: [
    PitchesinfoComponent,
  ],
  imports: [
    IonicPageModule.forChild(PitchesinfoComponent),
  ],
  exports: [
    PitchesinfoComponent
  ]
})
export class PitchesinfoComponentModule {}
