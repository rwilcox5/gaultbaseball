import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfomenuComponent } from './infomenu';

@NgModule({
  declarations: [
    InfomenuComponent,
  ],
  imports: [
    IonicPageModule.forChild(InfomenuComponent),
  ],
  exports: [
    InfomenuComponent
  ]
})
export class InfomenuComponentModule {}
