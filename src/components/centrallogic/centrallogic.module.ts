import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CentrallogicComponent } from './centrallogic';

@NgModule({
  declarations: [
    CentrallogicComponent,
  ],
  imports: [
    IonicPageModule.forChild(CentrallogicComponent),
  ],
  exports: [
    CentrallogicComponent
  ]
})
export class CentrallogicComponentModule {}
