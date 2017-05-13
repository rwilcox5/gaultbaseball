import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  outs: string;
  bases: string;
  battername: string;
  today: string;

  constructor(storage: Storage) {
    storage.ready().then(() => {
       storage.get('player1').then((val) => {this.battername = val.name;})
     });
    console.log('Hello SituationComponent Component');
    this.count = '3-2';
    this.outs = '2 Out';
    this.bases = 'bases';
    this.today = '2-4 (HR,3B,KK,BB,GO,FO)';
  }

}
