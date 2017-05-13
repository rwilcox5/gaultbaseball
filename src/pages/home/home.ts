import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storage: Storage;
  constructor(public navCtrl: NavController, storage: Storage) {
	   this.storage = new Storage(Storage);

  }

  createOpponent(){
    let zoneshold = [];
    let i = 0;
    for (i=0;i<25;i++){
    	zoneshold.push([10+Math.random()*60,100]);
    }
	this.storage.ready().then(() => {
  	   this.storage.set('player1', {'name':'Bob Johnson','stats':{'avg':'.342','obp':'.378','slg':'.402'},'bats':'R','zones':zoneshold});
  	   this.storage.set('player2', {'name':'William Santiago','stats':{'avg':'.302','obp':'.361','slg':'.431'},'bats':'L'});
     });


  }

}


