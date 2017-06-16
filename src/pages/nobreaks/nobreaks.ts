import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the NobreaksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nobreaks',
  templateUrl: 'nobreaks.html',
})
export class NobreaksPage {
	dicescore = [' ',' ',' ',' ',' ',' ',0,' ',' ',' ',' ',' ',' ',' ',0,0];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  this.dicescore = [' ',' ',' ',' ',' ',' ',0,' ',' ',' ',' ',' ',' ',' ',0,0];
  this.events.subscribe('updateDice', val => {this.dicescore[val[0]]=val[1]; 
  if (val[0]<6) {this.dicescore[6]=parseInt(this.dicescore[6].toString())+parseInt(val[1]);}
  else {this.dicescore[14]=parseInt(this.dicescore[14].toString())+parseInt(val[1]);}
  this.dicescore[15]=parseInt(this.dicescore[6].toString())+parseInt(this.dicescore[14].toString());
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NobreaksPage');
  }





}
