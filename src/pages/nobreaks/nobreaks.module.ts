import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NobreaksPage } from './nobreaks';

@NgModule({
  declarations: [
    NobreaksPage,
  ],
  imports: [
    IonicPageModule.forChild(NobreaksPage),
  ],
  exports: [
    NobreaksPage
  ]
})
export class NobreaksPageModule {}
