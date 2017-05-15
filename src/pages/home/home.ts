import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storage: Storage;
  allnicknames: string;
  constructor(public navCtrl: NavController, storage: Storage) {
	   this.storage = new Storage(Storage);

  }
 
  createOpponent(){
   
	this.storage.ready().then(() => {

	   this.storage.get('nicknames').then((val) => {this.allnicknames = val[3]; this.storage.set('player1', createPlayer(this.allnicknames));;});


  	   this.storage.set('player2', createPlayer('Billy "Buttermilk" Jackson'));
     });


  }

}

function createPlayer(pname){
	let zoneshold = [];
    let i = 0;
    for (i=0;i<25;i++){
    	zoneshold.push([10+Math.random()*60,100]);
    }
    let statshold = {'pa':0,'n1b':0,'n2b':0,'n3b':0,'hr':0,'bb':0,'hbp':0,'k':0,'ab':0,'avg':0,'obp':0,'slg':0,};
    statshold['pa'] = Math.floor(Math.random()*700);
    statshold['n1b'] = Math.floor(Math.random()*statshold.pa*.1+statshold.pa*.2);
    statshold['n2b'] = Math.floor(Math.random()*statshold.pa*.05+statshold.pa*.05);
    statshold['n3b'] = Math.floor(Math.random()*statshold.pa*.02+statshold.pa*.005);
    statshold['hr'] = Math.floor(Math.random()*statshold.pa*.1+statshold.pa*.01);
    statshold['bb'] = Math.floor(Math.random()*statshold.pa*.1+statshold.pa*.05);
    statshold['hbp'] = Math.floor(Math.random()*statshold.pa*.01+statshold.pa*.01);
    statshold['k'] = Math.floor(Math.random()*statshold.pa*.2+statshold.pa*.075);
    statshold['ab'] = statshold.pa-statshold.bb-statshold.hbp;
    statshold['avg'] = (statshold.n1b+statshold.n2b+statshold.n3b+statshold.hr)/statshold.ab;
    statshold['obp'] = (statshold.n1b+statshold.n2b+statshold.n3b+statshold.hr+statshold.bb+statshold.hbp)/statshold.pa;
    statshold['slg'] = (statshold.n1b+2*statshold.n2b+3*statshold.n3b+4*statshold.hr)/statshold.ab;

    let statsRhold = {'pa':0,'n1b':0,'n2b':0,'n3b':0,'hr':0,'bb':0,'hbp':0,'k':0,'ab':0,'avg':0,'obp':0,'slg':0,};
    statsRhold['pa'] = Math.floor(Math.random()*statshold.pa*.25+statshold.pa*.5);
    statsRhold['n1b'] = Math.floor(Math.random()*statsRhold.pa*.1+statsRhold.pa*.2);
    statsRhold['n2b'] = Math.floor(Math.random()*statsRhold.pa*.05+statsRhold.pa*.05);
    statsRhold['n3b'] = Math.floor(Math.random()*statsRhold.pa*.02+statsRhold.pa*.005);
    statsRhold['hr'] = Math.floor(Math.random()*statsRhold.pa*.1+statsRhold.pa*.01);
    statsRhold['bb'] = Math.floor(Math.random()*statsRhold.pa*.1+statsRhold.pa*.05);
    statsRhold['hbp'] = Math.floor(Math.random()*statsRhold.pa*.01+statsRhold.pa*.01);
    statsRhold['k'] = Math.floor(Math.random()*statsRhold.pa*.2+statsRhold.pa*.075);
    statsRhold['ab'] = statsRhold.pa-statsRhold.bb-statsRhold.hbp;
    statsRhold['avg'] = (statsRhold.n1b+statsRhold.n2b+statsRhold.n3b+statsRhold.hr)/statsRhold.ab;
    statsRhold['obp'] = (statsRhold.n1b+statsRhold.n2b+statsRhold.n3b+statsRhold.hr+statsRhold.bb+statsRhold.hbp)/statsRhold.pa;
    statsRhold['slg'] = (statsRhold.n1b+2*statsRhold.n2b+3*statsRhold.n3b+4*statsRhold.hr)/statsRhold.ab;

    let statsLhold = {'pa':0,'n1b':0,'n2b':0,'n3b':0,'hr':0,'bb':0,'hbp':0,'k':0,'ab':0,'avg':0,'obp':0,'slg':0,};
    statsLhold['pa'] = statshold.pa-statsRhold.pa;
    statsLhold['n1b'] = statshold.n1b-statsRhold.n1b;
    statsLhold['n2b'] = statshold.n2b-statsRhold.n2b;
    statsLhold['n3b'] = statshold.n3b-statsRhold.n3b;
    statsLhold['hr'] = statshold.hr-statsRhold.hr;
    statsLhold['bb'] = statshold.bb-statsRhold.bb;
    statsLhold['hbp'] = statshold.hbp-statsRhold.hbp;
    statsLhold['k'] = statshold.k-statsRhold.k;
    statsLhold['ab'] = statsLhold.pa-statsLhold.bb-statsLhold.hbp;
    statsLhold['avg'] = (statsLhold.n1b+statsLhold.n2b+statsLhold.n3b+statsLhold.hr)/statsLhold.ab;
    statsLhold['obp'] = (statsLhold.n1b+statsLhold.n2b+statsLhold.n3b+statsLhold.hr+statsLhold.bb+statsLhold.hbp)/statsLhold.pa;
    statsLhold['slg'] = (statsLhold.n1b+2*statsLhold.n2b+3*statsLhold.n3b+4*statsLhold.hr)/statsLhold.ab;
    return {'name':pname,'stats':statshold,'statsL':statsLhold,'statsR':statsRhold,'bats':'R','zones':zoneshold};
}

