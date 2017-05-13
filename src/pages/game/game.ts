import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
  		storage.ready().then(() => {



       storage.get('player1').then((val) => {
         console.log(val.name);
       })
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

  }

}

