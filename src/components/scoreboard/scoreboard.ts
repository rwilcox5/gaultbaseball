import { Component } from '@angular/core';
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
  AwayTeamRuns: number = 0;
  AwayTeamHits: number = 0;
  AwayTeamErrors: number = 0;
  HomeTeamRuns: number = 0;
  HomeTeamHits: number = 0;
  HomeTeamErrors: number = 0;

  constructor(public events: Events) {
  this.linescoreAway = ['0','0','0','0','0','0','0','0','0'];
  this.linescoreHome = ['0','0','0','0','0','0','0','0','0'];

     this.events.subscribe('centralScore', val => {
     let i=0;
     val[2][0]=0;
     for (i=0;i<val[0].length;i++){val[2][0]+=val[0][i];}
     val[3][0]=0;
     for (i=0;i<val[1].length;i++){val[3][0]+=val[1][i];}
     this.AwayTeamRuns = val[2][0];
       this.AwayTeamHits = val[2][1];
       this.AwayTeamErrors = val[2][2];
       this.HomeTeamRuns = val[3][0];
       this.HomeTeamHits = val[3][1];
       this.HomeTeamErrors = val[3][2];
     if (val[0].length<10){
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
       }
       else{
       for (i=val[0].length-9;i<val[0].length;i++){
       this.linescoreAway[i-val[0].length+9] = val[0][i].toString();
       }
       for (i=val[0].length-9;i<val[1].length;i++){
       this.linescoreHome[i-val[0].length+9] = val[1][i].toString();
       }
       if (val[1].length<val[0].length){this.linescoreHome[8] = ' ';}
       }

    });

    
  }

}
