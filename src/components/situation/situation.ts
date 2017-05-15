import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SituationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'situation',
  templateUrl: 'situation.html'
})
export class SituationComponent {

  count: string;
  balls:number = 0;
  strikes: number = 0;
  outsn: number = 0;
  outs: string;
  bases: string;
  battername: string;
  today: string;

  constructor(public events: Events, storage: Storage) {
    storage.ready().then(() => {
       storage.get('player1').then((val) => {this.battername = val.name;})
     });
    console.log('Hello SituationComponent Component');
    this.count = this.balls.toString().concat('-').concat(this.strikes.toString());
    this.outs = this.outsn.toString().concat(' Outs');
    this.bases = 'bases';
    this.today = '2-4 (HR,3B,KK,BB,GO,FO)';
    this.events.subscribe('userTap', call => {

    if (call=='strike'){
    if (this.strikes==2){
	this.outsn++;
    this.strikes=0;
    this.balls = 0;
    }
    else{
    this.strikes++;
    }
    }
    else if (call=='ball') {
    if (this.balls==3){
    this.strikes=0;
    this.balls = 0;
    }
    else{
    this.balls++;
    }
    }
    else if (call=='out'){
    this.outsn++;
    this.strikes=0;
    this.balls = 0;
    }
    this.count = this.balls.toString().concat('-').concat(this.strikes.toString());
    this.outs = this.outsn.toString().concat(' Outs');

    });
  }

}
