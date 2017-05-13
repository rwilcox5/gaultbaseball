import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrikezoneComponent } from './strikezone';

@NgModule({
  declarations: [
    StrikezoneComponent,
  ],
  imports: [
    IonicPageModule.forChild(StrikezoneComponent),
  ],
  exports: [
    StrikezoneComponent
  ]
})
export class StrikezoneComponentModule {}
