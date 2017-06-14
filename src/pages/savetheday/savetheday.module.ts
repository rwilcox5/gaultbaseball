import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavethedayPage } from './savetheday';

@NgModule({
  declarations: [
    SavethedayPage,
  ],
  imports: [
    IonicPageModule.forChild(SavethedayPage),
  ],
  exports: [
    SavethedayPage
  ]
})
export class SavethedayPageModule {}
