import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GameNothingPage } from '../game-nothing/game-nothing';


/**
 * Generated class for the NothingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nothing',
  templateUrl: 'nothing.html',
})
export class NothingPage {
images = [['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png']];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events) {
  this.storage.ready().then(() => {
  	this.storage.get('nothing').then(val =>   	{

  	if (val != null){
  	let i = 0;
  	let ii =0;
  	for (i=0;i<9;i++){
  	for (ii=0;ii<4;ii++){
  	if (val[i][ii]=='true') {this.images[i][ii] = 'assets/img/blue.png';} 
  	else {this.images[i][ii] = 'assets/img/blank.png';}
  	}
  	}

  	}

  	})

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NothingPage');
  }
  playNothing(linescore,gameId,situation){
  

  this.storage.ready().then(() => {
  	this.storage.set('noMission',gameId)
  	})

  this.navCtrl.push(GameNothingPage);

  }

}
