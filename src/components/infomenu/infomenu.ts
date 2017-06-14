import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LineupPage } from '../lineup/lineup';
import { BullpenPage } from '../bullpen/bullpen';

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
    storage.get('gametype').then(gtval => {
       storage.get('lineup'+gtval).then((val) => {
       storage.get('situation'+gtval).then((sitval) => {
       batters = [];
       let nbatters = 9;
       if (gtval=='27'){
       nbatters = 27;
       }
       orderPlace = sitval[3]%nbatters;
       let ii = 0;
       		for (ii=0;ii<3*nbatters;ii++){
       		let i = 0;
       		if (ii<nbatters){i=ii*3;}
       		else if (ii<2*nbatters){i=(ii-nbatters)*3+1}
       		else if (ii<3*nbatters){i=(ii-2*nbatters)*3+2}
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
  this.storage.ready().then(() => {
    this.storage.get('gametype').then(gtval => {
       this.storage.get('bullpen'+gtval).then((val) => {
       pitchers = [];
       let npitchers = 11;
       let ii = 0;
       		for (ii=0;ii<3*npitchers;ii++){
       		let i = 0;
       		if (ii<npitchers){i=ii*3;}
       		else if (ii<2*npitchers){i=(ii-npitchers)*3+1}
       		else if (ii<3*npitchers){i=(ii-2*npitchers)*3+2}
       		let tempavg = val[i].avg.toFixed(3).substring(1,);
       		let tempobp = val[i].obp.toFixed(3).substring(1,);
       		let tempslg = val[i].slg.toFixed(3).substring(1,);
       		let tempera = val[i].era.toFixed(3).substring(1,);
       		if (val[i].avg>= 1){tempavg = val[i].avg.toFixed(3)}
       		if (val[i].obp>= 1){tempobp = val[i].obp.toFixed(3)}
       		if (val[i].slg>= 1){tempslg = val[i].slg.toFixed(3)}
       		if (val[i].era>= 1){tempera = val[i].era.toFixed(3)}
       		pitchers.push({'name':val[i].name,'throws':val[i].throws,'ERA':tempera,'AVG':tempavg,'OBP':tempobp,'SLG':tempslg,'ip':val[i].ip,'hr':val[i].hr,'k':val[i].k,'bb':val[i].bb});
       		}
       	let i = 0;

  let tnames = [];  let tthrows = []; let teras = [];  let tavgs = [];  let tobps = [];  let tslgs = [];  let tips = [];  let thrs = [];  let tks = [];  let tbbs = [];
  for (i=0;i<npitchers;i++){
  tnames.push(pitchers[i].name);  tthrows.push(pitchers[i].throws); teras.push(pitchers[i].ERA);  tavgs.push(pitchers[i].AVG);  tobps.push(pitchers[i].OBP);  tslgs.push(pitchers[i].SLG);  tips.push(pitchers[i].ip);  thrs.push(pitchers[i].hr); tks.push(pitchers[i].k);  tbbs.push(pitchers[i].bb);
  }
  let allstats = {'place':orderPlace,'names':tnames,'throws':tthrows,'eras':teras,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'ips':tips,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tthrows = []; teras = [];  tavgs = [];  tobps = [];  tslgs = [];  tips = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=npitchers;i<2*npitchers;i++){
  tnames.push(pitchers[i].name);  tthrows.push(pitchers[i].throws); teras.push(pitchers[i].ERA);  tavgs.push(pitchers[i].AVG);  tobps.push(pitchers[i].OBP);  tslgs.push(pitchers[i].SLG);  tips.push(pitchers[i].ip);  thrs.push(pitchers[i].hr); tks.push(pitchers[i].k);  tbbs.push(pitchers[i].bb);
  }
  let Rstats = {'place':orderPlace,'names':tnames,'throws':tthrows,'eras':teras,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'ips':tips,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tthrows = []; teras =[]; tavgs = [];  tobps = [];  tslgs = [];  tips = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=2*npitchers;i<3*npitchers;i++){
  tnames.push(pitchers[i].name);  tthrows.push(pitchers[i].throws); teras.push(pitchers[i].ERA);  tavgs.push(pitchers[i].AVG);  tobps.push(pitchers[i].OBP);  tslgs.push(pitchers[i].SLG);  tips.push(pitchers[i].ip);  thrs.push(pitchers[i].hr); tks.push(pitchers[i].k);  tbbs.push(pitchers[i].bb);
  }
  let Lstats = {'place':orderPlace,'names':tnames,'throws':tthrows,'eras':teras,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'ips':tips,'hrs':thrs,'ks':tks,'bbs':tbbs};
  console.log('infomenu'+tips);
  let bobj = {'all':allstats,'r':Rstats,'l':Lstats};
  console.log(bobj.all.names.length);

    let myModal = this.modalCtrl.create(BullpenPage, bobj);
    myModal.present();
       })
    })
    })
  }
  presentLineup() {

	this.storage.ready().then(() => {
    this.storage.get('gametype').then(gtval => {
       this.storage.get('lineup'+gtval).then((val) => {
       this.storage.get('situation'+gtval).then((sitval) => {
       batters = [];
       let nbatters = 9;
       if (gtval=='27'){
       nbatters = 27;
       }
       orderPlace = sitval[3]%nbatters;
       let ii = 0;
       		for (ii=0;ii<3*nbatters;ii++){
       		let i = 0;
       		if (ii<nbatters){i=ii*3;}
       		else if (ii<2*nbatters){i=(ii-nbatters)*3+1}
       		else if (ii<3*nbatters){i=(ii-2*nbatters)*3+2}
       		let tempavg = val[i].avg.toFixed(3).substring(1,);
       		let tempobp = val[i].obp.toFixed(3).substring(1,);
       		let tempslg = val[i].slg.toFixed(3).substring(1,);
       		if (val[i].avg>= 1){tempavg = val[i].avg.toFixed(3)}
       		if (val[i].obp>= 1){tempobp = val[i].obp.toFixed(3)}
       		if (val[i].slg>= 1){tempslg = val[i].slg.toFixed(3)}
       		batters.push({'name':val[i].name,'bats':val[i].bats,'AVG':tempavg,'OBP':tempobp,'SLG':tempslg,'pa':val[i].pa,'hr':val[i].hr,'k':val[i].k,'bb':val[i].bb});
       		}
       	let i = 0;

  let tnames = [];  let tbats = [];  let tavgs = [];  let tobps = [];  let tslgs = [];  let tpas = [];  let thrs = [];  let tks = [];  let tbbs = [];
  for (i=0;i<nbatters;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let allstats = {'place':orderPlace,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tbats = [];  tavgs = [];  tobps = [];  tslgs = [];  tpas = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=nbatters;i<2*nbatters;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let Rstats = {'place':orderPlace,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  tnames = [];  tbats = [];  tavgs = [];  tobps = [];  tslgs = [];  tpas = [];  thrs = [];  tks = [];  tbbs = [];
  for (i=2*nbatters;i<3*nbatters;i++){
  tnames.push(batters[i].name);  tbats.push(batters[i].bats);  tavgs.push(batters[i].AVG);  tobps.push(batters[i].OBP);  tslgs.push(batters[i].SLG);  tpas.push(batters[i].pa);  thrs.push(batters[i].hr); tks.push(batters[i].k);  tbbs.push(batters[i].bb);
  }
  let Lstats = {'place':orderPlace,'names':tnames,'bats':tbats,'avgs':tavgs,'obps':tobps,'slgs':tslgs,'pas':tpas,'hrs':thrs,'ks':tks,'bbs':tbbs};

  let bobj = {'all':allstats,'r':Rstats,'l':Lstats};
  console.log(bobj.all.names.length);

    let myModal = this.modalCtrl.create(LineupPage, bobj);
    myModal.present();
       })
       })
    })
    })

  
  }

}

var batters = [];
var pitchers = [];
var orderPlace =0;