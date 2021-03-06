import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';
import { GameNothingPage } from '../pages/game-nothing/game-nothing';
import { LineupPage } from '../components/lineup/lineup';
import { BullpenPage } from '../components/bullpen/bullpen';
import { Bust27Page } from '../pages/bust27/bust27';
import { NothingPage } from '../pages/nothing/nothing';
import { SavethedayPage } from '../pages/savetheday/savetheday';
import { NobreaksPage } from '../pages/nobreaks/nobreaks';
import { PracticePage } from '../pages/practice/practice';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { CreateteamPage } from '../pages/createteam/createteam';
import { EditteamPage } from '../pages/editteam/editteam';
import { ViewteamPage } from '../pages/viewteam/viewteam';
import { CreategamePage } from '../pages/creategame/creategame';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StrikezoneComponent } from '../components/strikezone/strikezone';
import { ScoreboardComponent } from '../components/scoreboard/scoreboard';
import { SituationComponent } from '../components/situation/situation';
import { BatterinfoComponent } from '../components/batterinfo/batterinfo';
import { InfomenuComponent } from '../components/infomenu/infomenu';
import { PitcherinfoComponent } from '../components/pitcherinfo/pitcherinfo';
import { CentrallogicComponent } from '../components/centrallogic/centrallogic';
import { SituationDiceComponent } from '../components/situation-dice/situation-dice';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    GameNothingPage,
    ListPage,
    LineupPage,
    BullpenPage,
    Bust27Page,
    NothingPage,
    SavethedayPage,
    NobreaksPage,
    PracticePage,
    TutorialPage,
    CreateteamPage,
    EditteamPage,
    ViewteamPage,
    CreategamePage,
    StrikezoneComponent,
    ScoreboardComponent,
    SituationComponent,
    BatterinfoComponent,
    InfomenuComponent,
    PitcherinfoComponent,
    CentrallogicComponent,
    SituationDiceComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    GameNothingPage,
    LineupPage,
    BullpenPage,
    ListPage,
    Bust27Page,
    NothingPage,
    SavethedayPage,
    NobreaksPage,
    PracticePage,
    TutorialPage,
    CreateteamPage,
    EditteamPage,
    ViewteamPage,
    CreategamePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
