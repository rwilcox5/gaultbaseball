import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BullpenPage } from './bullpen';

@NgModule({
  declarations: [
    BullpenPage,
  ],
  imports: [
    IonicPageModule.forChild(BullpenPage),
  ],
  exports: [
    BullpenPage
  ]
})
export class BullpenPageModule {}
