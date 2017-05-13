import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreboardComponent } from './scoreboard';

@NgModule({
  declarations: [
    ScoreboardComponent,
  ],
  imports: [
    IonicPageModule.forChild(ScoreboardComponent),
  ],
  exports: [
    ScoreboardComponent
  ]
})
export class ScoreboardComponentModule {}
