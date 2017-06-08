import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NobreaksPage } from './nobreaks';
import { StrikezoneComponentModule } from '../../components/strikezone/strikezone.module';
import { ScoreboardComponentModule } from '../../components/scoreboard/scoreboard.module';
import { SituationComponentModule } from '../../components/situation/situation.module';
import { BatterinfoComponentModule } from '../../components/batterinfo/batterinfo.module';
import { PitcherinfoComponentModule } from '../../components/pitcherinfo/pitcherinfo.module';
import { InfomenuComponentModule } from '../../components/infomenu/infomenu.module';
import { CentrallogicComponentModule } from '../../components/centrallogic/centrallogic.module';

@NgModule({
  declarations: [
    NobreaksPage,
  ],
  imports: [
  StrikezoneComponentModule,
    ScoreboardComponentModule,
    SituationComponentModule,
    BatterinfoComponentModule,
    PitcherinfoComponentModule,
    InfomenuComponentModule,
    CentrallogicComponentModule,
    IonicPageModule.forChild(NobreaksPage),
  ],
  exports: [
    NobreaksPage
  ]
})
export class NobreaksPageModule {}
