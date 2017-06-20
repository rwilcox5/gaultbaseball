import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Bust27Page } from '../bust27/bust27';
import { NothingPage } from '../nothing/nothing';
import { SavethedayPage } from '../savetheday/savetheday';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GameNothingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-game-nothing',
  templateUrl: 'game-nothing.html',
})
export class GameNothingPage {
  goal: string = 'Pitch a shutout.';
  linescoreAway = [0,0,' ',' ',' ', ' ',' ',' ',' '];
  AwayTeamRuns = 0;
  AwayTeamHits = 0;
  AwayTeamErrors = 0;
  maxInnings = 9;
  stop ='run';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public events: Events, public storage: Storage) {
  this.events.subscribe('gameOver', gameVal => {
  if (gameVal == ''){    
  this.navCtrl.push(HomePage);
  }
  if (gameVal == 'nothing'){    
  this.navCtrl.push(NothingPage);
  }
  })

  this.events.subscribe('abResult', val => {
  let linescore = [];
  this.storage.ready().then(() => {
	this.storage.get('linescorenothing').then(val =>  {
	linescore = val;
  })
  })

  if (this.stop=='hit') {if (val=='Single' || val=='Double' ||val=='Triple' || val=='Home Run') {console.log('Game Over. You Lose.');} else if (linescore[0].length==this.maxInnings+1) {console.log('Game Over. You Won.');}}


  })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.storage.ready().then(() => {
  	this.storage.get('noMission').then(gameId =>  {
  	let mission = '';
  if (gameId==0){mission = 'Pitch a 5 inning Shutout'; this.maxInnings = 5; this.stop = 'run';}
  if (gameId==1){mission = 'Pitch a 5 inning No-Hitter'; this.maxInnings = 5; this.stop = 'hit';}
  if (gameId==2){mission = 'Pitch a 5 inning Perfect Game'}
  if (gameId==3){mission = 'Pitch a 9 inning Shutout'}
  if (gameId==4){mission = 'Pitch a 9 inning No-Hitter'}
  if (gameId==5){mission = 'Pitch a 9 inning Perfect Game'}
  if (gameId==6){mission = 'Pitch a 5 inning Shutout without throwing any balls'}
  if (gameId==7){mission = 'Pitch a 9 inning Shutout without throwing any balls'}
  if (gameId==8){mission = 'Pitch a 5 inning Shutout without any movement on your pitches'}
  if (gameId==9){mission = 'Pitch a 9 inning Shutout without any movement on your pitches'}
  if (gameId==10){mission = 'Pitch a 5 inning No-Hitter without any movement on your pitches'}
  if (gameId==11){mission = 'Pitch a 9 inning No-Hitter without any movement on your pitches'}
  if (gameId==12){mission = 'Pitch a 5 inning Perfect Game without any movement on your pitches'}
  if (gameId==13){mission = 'Pitch a 9 inning Perfect Game without any movement on your pitches'}
  if (gameId==14){mission = 'Pitch a 5 inning Shutout with fewer than 40 pitches'}
  if (gameId==15){mission = 'Pitch a 5 inning No-Hitter with fewer than 40 pitches'}
  if (gameId==16){mission = 'Pitch a 5 inning Perfect Game with fewer than 40 pitches'}
  if (gameId==17){mission = 'Pitch a 9 inning Shutout with fewer than 80 pitches'}
  if (gameId==18){mission = 'Pitch a 9 inning No-Hitter with fewer than 80 pitches'}
  if (gameId==19){mission = 'Pitch a 9 inning Perfect Game with fewer than 80 pitches'}
  if (gameId==20){mission = 'Pitch a 5 inning Shutout with more than 70 pitches'}
  if (gameId==21){mission = 'Pitch a 5 inning No-Hitter with more than 70 pitches'}
  if (gameId==22){mission = 'Pitch a 5 inning Perfect Game with more than 70 pitches'}
  if (gameId==23){mission = 'Pitch a 9 inning Shutout with more than 120 pitches'}
  if (gameId==24){mission = 'Pitch a 9 inning No-Hitter with more than 120 pitches'}
  if (gameId==25){mission = 'Pitch a 9 inning Perfect Game with more than 120 pitches'}
  if (gameId==26){mission = 'Pitch consecutive 9 inning No-Hitters'}
  	this.goal = mission;
  	})
  	})

  }

  ionViewWillLeave(){this.events.publish('leaving','game'); console.log('leaving strikezone');}

}
