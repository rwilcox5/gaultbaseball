import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BatterinfoComponent } from './batterinfo';
import { InfomenuComponentModule } from '../../components/infomenu/infomenu.module';

@NgModule({
  declarations: [
    BatterinfoComponent,
  ],
  imports: [
  InfomenuComponentModule,
    IonicPageModule.forChild(BatterinfoComponent),
  ],
  exports: [
    BatterinfoComponent
  ]
})
export class BatterinfoComponentModule {}
