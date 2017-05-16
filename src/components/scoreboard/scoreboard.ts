import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ScoreboardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'scoreboard',
  templateUrl: 'scoreboard.html'
})
export class ScoreboardComponent {

  linescoreAway: Array<string>;
  linescoreHome: Array<string>;

  constructor(public storage: Storage, public events: Events) {
  this.linescoreAway = ['0','0','0','0','0','0','0','0','0'];
  this.linescoreHome = ['0','0','0','0','0','0','0','0','0'];
  storage.ready().then(() => {
       storage.get('linescore').then((val) => {
       let i = 0;
       this.linescoreAway = ['0','0','0','0','0','0','0','0','0'];
       this.linescoreHome = ['0','0','0','0','0','0','0','0','0'];
       for (i=0;i<val[0].length;i++){
       this.linescoreAway[i] = val[0][i].toString();
       }
       for (i=val[0].length;i<9;i++){
       this.linescoreAway[i] = ' ';
       }
       for (i=0;i<val[1].length;i++){
       this.linescoreHome[i] = val[1][i].toString();
       }
       for (i=val[1].length;i<9;i++){
       this.linescoreHome[i] = ' ';
       }

       })
     });

     this.events.subscribe('centralScore', val => {
     let i=0;
     for (i=0;i<val[0].length;i++){
       this.linescoreAway[i] = val[0][i].toString();
       }
       for (i=val[0].length;i<9;i++){
       this.linescoreAway[i] = ' ';
       }
       for (i=0;i<val[1].length;i++){
       this.linescoreHome[i] = val[1][i].toString();
       }
       for (i=val[1].length;i<9;i++){
       this.linescoreHome[i] = ' ';
       }

    });

    
  }

}
