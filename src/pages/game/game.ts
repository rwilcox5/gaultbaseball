import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Bust27Page } from '../bust27/bust27';
import { NothingPage } from '../nothing/nothing';
import { SavethedayPage } from '../savetheday/savetheday';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})


export class GamePage {
  storage: Storage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public events: Events, storage: Storage) {
  this.events.subscribe('gameOver', gameVal => {
  if (gameVal == ''){    
  this.navCtrl.push(HomePage);
  }
  if (gameVal == 'save'){    
  this.navCtrl.push(SavethedayPage);
  }
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

  }

  ionViewWillLeave(){this.events.publish('leaving','game'); console.log('leaving strikezone');}

}

