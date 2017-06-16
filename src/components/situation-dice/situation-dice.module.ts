import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SituationDiceComponent } from './situation-dice';

@NgModule({
  declarations: [
    SituationDiceComponent,
  ],
  imports: [
    IonicPageModule.forChild(SituationDiceComponent),
  ],
  exports: [
    SituationDiceComponent
  ]
})
export class SituationDiceComponentModule {}
