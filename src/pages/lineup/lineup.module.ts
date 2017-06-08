import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineupPage } from './lineup';

@NgModule({
  declarations: [
    LineupPage,
  ],
  imports: [
    IonicPageModule.forChild(LineupPage),
  ],
  exports: [
    LineupPage
  ]
})
export class LineupPageModule {}
