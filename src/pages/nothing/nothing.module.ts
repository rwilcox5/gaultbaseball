import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NothingPage } from './nothing';

@NgModule({
  declarations: [
    NothingPage,
  ],
  imports: [
    IonicPageModule.forChild(NothingPage),
  ],
  exports: [
    NothingPage
  ]
})
export class NothingPageModule {}
