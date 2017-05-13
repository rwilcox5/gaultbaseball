import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BatterinfoComponent } from './batterinfo';

@NgModule({
  declarations: [
    BatterinfoComponent,
  ],
  imports: [
    IonicPageModule.forChild(BatterinfoComponent),
  ],
  exports: [
    BatterinfoComponent
  ]
})
export class BatterinfoComponentModule {}
