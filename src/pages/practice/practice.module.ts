import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticePage } from './practice';

@NgModule({
  declarations: [
    PracticePage,
  ],
  imports: [
    IonicPageModule.forChild(PracticePage),
  ],
  exports: [
    PracticePage
  ]
})
export class PracticePageModule {}
