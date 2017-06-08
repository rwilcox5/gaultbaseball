import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateteamPage } from './createteam';

@NgModule({
  declarations: [
    CreateteamPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateteamPage),
  ],
  exports: [
    CreateteamPage
  ]
})
export class CreateteamPageModule {}
