import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LineupPage } from '../lineup/lineup';

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
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
       		batters.push({'name':'B1','bats':'L','AVG':.311,'OBP':.388,'SLG':.401});
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
presentLineup() {
  let i = 0;
  let battersLineup = '<table><tr><td>Name</td><td>Bats</td><td>AVG</td><td>OBP</td><td>SLG</td>';
  for (i=0;i<9;i++){
  battersLineup = battersLineup.concat('<tr><td>'+batters[i].name+'</td><td>'+batters[i].bats+'</td><td>'+batters[i].AVG.toString()+'</td><td>'+batters[i].OBP.toString()+'</td><td>'+batters[i].SLG.toString()+'</td></tr>');
  }
  battersLineup = battersLineup.concat('</table>');
  let alert = this.alertCtrl.create({
    title: 'Lineup',
    subTitle: battersLineup,
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
  presentStats() {
    let myModal = this.modalCtrl.create(LineupPage);
    myModal.present();
  }

}

var batters = [];