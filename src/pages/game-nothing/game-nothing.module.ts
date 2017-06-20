import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameNothingPage } from './game-nothing';

@NgModule({
  declarations: [
    GameNothingPage,
  ],
  imports: [
    IonicPageModule.forChild(GameNothingPage),
  ],
  exports: [
    GameNothingPage
  ]
})
export class GameNothingPageModule {}
