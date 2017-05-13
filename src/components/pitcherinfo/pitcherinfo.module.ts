import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PitcherinfoComponent } from './pitcherinfo';
import { StrikezoneComponentModule } from '../../components/strikezone/strikezone.module';

@NgModule({
  declarations: [
    PitcherinfoComponent,

  ],
  imports: [
    StrikezoneComponentModule,
    IonicPageModule.forChild(PitcherinfoComponent),

  ],
  exports: [
    PitcherinfoComponent
  ]
})
export class PitcherinfoComponentModule {}
