import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Bust27Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bust27',
  templateUrl: 'bust27.html',
})
export class Bust27Page {
	b: Array<string> = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {
  this.b = [];
  let i =0;
  for (i=0;i<27;i++){  this.b.push(' '); }
  this.storage.ready().then(() => {
       storage.get('situation'+'27').then(sitval => {
       let nks = sitval[3];       
       let i = 0;
       for (i=0;i<nks;i++){
       this.b[i] = 'K';
       }

	})
  	})
  
  this.events.subscribe('central27', pitch => {
  if (pitch=='loss'){
  document.getElementById('goHome').style.display='block';
  }
  else{
  let i = 0;
  let ii = 0;
  for (i=0;i<27;i++){if (this.b[i]==' '){this.b[i]='K';ii = i+1;i=27;} else if (i==25){this.b[26]='K';console.log('You Win');}}
  this.storage.ready().then(() => {
       storage.set('situation'+'27',[0,0,0,ii,[0,0,0]]);

  	})
  }
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Bust27Page');
  }

  goHome(){this.navCtrl.push(HomePage); }

}
