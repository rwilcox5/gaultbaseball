import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewteamPage } from './viewteam';

@NgModule({
  declarations: [
    ViewteamPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewteamPage),
  ],
  exports: [
    ViewteamPage
  ]
})
export class ViewteamPageModule {}
