import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreategamePage } from './creategame';

@NgModule({
  declarations: [
    CreategamePage,
  ],
  imports: [
    IonicPageModule.forChild(CreategamePage),
  ],
  exports: [
    CreategamePage
  ]
})
export class CreategamePageModule {}
