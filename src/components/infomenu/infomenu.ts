import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LineupPage } from '../../pages/lineup/lineup';

/**
 * Generated class for the InfomenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'infomenu',
  templateUrl: 'infomenu.html'
})
export class InfomenuComponent {

  text: string;

  constructor(private alertCtrl: AlertController, public storage: Storage, public events: Events, public modalCtrl: ModalController) {
    console.log('Hello InfomenuComponent Component');
    this.text = 'Hello World';
    storage.ready().then(() => {
       storage.get('lineup').then((val) => {
       batters = [];
       let ii = 0;
       		for (ii=0;ii<27;ii++){
       		let i = 0;
       		if (ii<9){i=ii*3;}
       		else if (ii<18){i=(ii-9)*3+1}
       		else if (ii<27){i=(ii-18)*3+2}
       		let tempavg = val[i].avg.toFixed(3).substring(1,);
       		let tempobp = val[i].obp.toFixed(3).substring(1,);
       		let tempslg = val[i].slg.toFixed(3).substring(1,);
       		if (val[i].avg>= 1){tempavg = val[i].avg.toFixed(3)}
       		if (val[i].obp>= 1){tempobp = val[i].obp.toFixed(3)}
       		if (val[i].slg>= 1){tempslg = val[i].slg.toFixed(3)}
       		batters.push({'name':val[i].name,'bats':val[i].bats,'AVG':tempavg,'OBP':tempobp,'SLG':tempslg,'pa':val[i].pa,'hr':val[i].hr,'k':val[i].k,'bb':val[i].bb});
       		}
       })
    })

  }

  presentMenu() {
  let alert = this.alertCtrl.create({
    title: 'Options',
    subTitle: 'What do you want to do?',
    buttons: [{
        text: 'Quit App',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'New Game',
        handler: () => {
          console.log('Buy clicked');
        }
      },
      {
        text: 'Mini Game',
        role: 'cancel',
        handler: () => {
          console.log('Cancel2 clicked');
        }
      },
      {
        text: 'Resume',
        handler: () => {
          console.log('Buy2 clicked');
        }
      }]
  });
  alert.present();
  }
presentStats() {

  let alert = this.alertCtrl.create({
    title: 'Lineup',
    subTitle: 'Hiya',
    buttons: ['Dismiss']
  });
  alert.present();
  }
  presentBullpen() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
  }
  presentLineup() {

  let i = 0;

  let tnames = [];  let tbats = [];  let tavgs = [];  let tobps = [];  let tslgs = [];  let tpas = [];  let thrs = [];  let tks = [];  let tbbs = [];
  for (i=0;i<9;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let allstats = {'place':5,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tbats = [];  tavgs = [];  tobps = [];  tslgs = [];  tpas = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=9;i<18;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let Rstats = {'place':5,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tbats = [];  tavgs = [];  tobps = [];  tslgs = [];  tpas = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=18;i<27;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let Lstats = {'place':5,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  let bobj = {'all':allstats,'r':Rstats,'l':Lstats};

    let myModal = this.modalCtrl.create(LineupPage, bobj);
    myModal.present();
  }

}

var batters = [];