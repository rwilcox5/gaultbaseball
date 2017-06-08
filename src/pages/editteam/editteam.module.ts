import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditteamPage } from './editteam';

@NgModule({
  declarations: [
    EditteamPage,
  ],
  imports: [
    IonicPageModule.forChild(EditteamPage),
  ],
  exports: [
    EditteamPage
  ]
})
export class EditteamPageModule {}
