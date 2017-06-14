import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GamePage } from '../game/game';
import { newGame } from '../creategame/creategame';


/**
 * Generated class for the SavethedayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-savetheday',
  templateUrl: 'savetheday.html',
})
export class SavethedayPage {

  storage: Storage;
  images = [['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png'],['assets/img/blank.png','assets/img/blank.png','assets/img/blank.png','assets/img/blank.png']];


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, storage: Storage) {
  this.storage = new Storage(Storage);
  this.storage.ready().then(() => {
  	this.storage.get('save').then(val =>   	{

  	if (val != null){
  	let i = 0;
  	let ii =0;
  	for (i=0;i<3;i++){
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
    console.log('ionViewDidLoad SavethedayPage');
  }

  playSavetheday(linescore,gameId){
  this.storage.ready().then(() => {
  this.storage.set('saveId',gameId);
  })
  newGame('save',this.storage,'team0',15,'team0',this.navCtrl,linescore,[2,0,0,1,[0,1,1]]);
  console.log('std');

  		console.log('std storage');
  		this.navCtrl.push(GamePage);

  		}


}
