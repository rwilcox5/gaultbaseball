import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StrikezoneComponent } from '../components/strikezone/strikezone';
import { ScoreboardComponent } from '../components/scoreboard/scoreboard';
import { SituationComponent } from '../components/situation/situation';
import { BatterinfoComponent } from '../components/batterinfo/batterinfo';
import { PitchesinfoComponent } from '../components/pitchesinfo/pitchesinfo';
import { InfomenuComponent } from '../components/infomenu/infomenu';
import { PitcherinfoComponent } from '../components/pitcherinfo/pitcherinfo';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    ListPage,
    StrikezoneComponent,
    ScoreboardComponent,
    SituationComponent,
    BatterinfoComponent,
    PitchesinfoComponent,
    InfomenuComponent,
    PitcherinfoComponent
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
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
