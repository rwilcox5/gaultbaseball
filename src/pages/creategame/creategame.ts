import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GamePage } from '../game/game';
import { createBatter } from '../createteam/createteam';

/**
 * Generated class for the CreategamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-creategame',
  templateUrl: 'creategame.html',
})
export class CreategamePage {
private oppOffense = 50;

  storage: Storage;
  allnicknames: string;
  oppPitcher: number = 50;
  myOffense: number = 50;
  teams: Array<object> = [];
  pitchers: Array<object> = [];
  batters = [createBatter({'id':1},true,'John K. Placeholder III'),createBatter({'id':2},true,'John'),createBatter({'id':3},true,'John'),createBatter({'id':4},true,'John'),createBatter({'id':5},true,'John'),createBatter({'id':6},true,'John'),createBatter({'id':7},true,'John'),createBatter({'id':8},true,'John'),createBatter({'id':9},true,'John'),createBatter({'id':10},true,'John'),createBatter({'id':11},true,'John'),createBatter({'id':12},true,'John'),createBatter({'id':13},true,'John'),createBatter({'id':14},true,'John')];
  myteam: string = '';
  opponent: string = '';
  mypitcher: string = '15';
  position: Array<string> = [''];
  mname: string = 'position[3]';

  constructor(public navCtrl: NavController, storage: Storage) {


	   this.storage = new Storage(Storage);


	   this.storage.ready().then(() => {
	this.storage.get('teamList').then((idval) => {
	
	let i =0;
	for (i=0;i<idval.length;i++){
	this.storage.get(idval[i]).then((teamval) => { this.teams.push(teamval);})
	}
	
	
	})

		})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreategamePage');
  }
  chooseTeam(){
  
	   this.storage.ready().then(() => {
	this.storage.get(this.myteam).then((mtval) => {
	this.pitchers = mtval.pitchers;
	
	this.storage.get(this.opponent).then((val) => {
	this.batters = [];
	let i = 0;
	for (i=1;i<10;i++){
	let ii = 0;
	for (ii=0;ii<14;ii++){
	if (val.batters[ii].order==i){
	this.batters.push(val.batters[ii]);
	}
	

	}
	}

	for (i=10;i<11;i++){
	let ii = 0;
	for (ii=0;ii<14;ii++){
	if (val.batters[ii].order==i){
	val.batters[ii]['order']='BN';
	this.batters.push(val.batters[ii]);
	}

	
	}
	}

	for (i=0;i<14;i++){

	this.position.push(val.batters[i].position);


	}




	})

		})
		})
  }

  reorderItems(indexes){
  let element = this.batters[indexes.from];
    this.batters.splice(indexes.from, 1);
    this.batters.splice(indexes.to, 0, element);
    let i =0;
    for (i=0;i<this.batters.length;i++){
    if (i<9){
		this.batters[i]['order']=i+1;
	}
	else {
		this.batters[i]['order']='BN';
	}
    }

  }

  createGame(){newGame('',this.storage,this.opponent,this.mypitcher,this.myteam,this.navCtrl); this.navCtrl.push(GamePage);
  }
  teamSelected(){
  	if (this.batters[0].name=='John K. Placeholder III'){
  	return false;
  	}
  	else {
  	return true;
  	}
  }

}






function swingPercentage([maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey],xL,yL){
   let spx = (minValuex-maxValuex)/(100)**2*(xL-maxLocationx)**2+maxValuex;
   let spy = (minValuey-maxValuey)/(100)**2*(yL-maxLocationy)**2+maxValuey;
   let swingPercentage = Math.max(spx*spy,0);
   return swingPercentage;
}

export function newGame(gtype,storage,opponent,mypitcher,myteam,navControl,linescoreInit=[[0],[],[0,0,0],[0,0,0]],situationInit=[0,0,0,0,[0,0,0]]){

  	storage.ready().then(() => {
		storage.set('gametype',gtype);

		let oppLineup = [];
		let bullpen = [];
		storage.set('nicknames', ['Apollo','Buttermilk','Catfish','Destroyer','Elephant','Foxy','Gunner','Harpoon','Ikabod']);

	   storage.set('awayTeam'+gtype, opponent);

  	   storage.set('currentSequence'+gtype, []);
  	   
  	   storage.set('situation'+gtype, situationInit);
  	   storage.set('linescore'+gtype,linescoreInit);
  	   storage.set('currentPitcher'+gtype,mypitcher);
  	   storage.set('homeTeam'+gtype,myteam);
  	   storage.get(opponent).then(awayval => {
  	   storage.get(myteam).then(homeval => {
  	   let batters = awayval.batters;
  	   let pitchers = homeval.pitchers;
  	   let i = 0;
  	   for (i=1;i<10;i++){
  	   let ii =0;
  	   for (ii=0;ii<14;ii++){
  	   if (batters[ii]['order']==i){
  	   let cPlayer = batters[ii];
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.stats.avg,'obp':cPlayer.stats.obp,'slg':cPlayer.stats.slg,'pa':cPlayer.stats.pa,'hr':cPlayer.stats.hr,'k':cPlayer.stats.k,'bb':cPlayer.stats.bb});
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsR.avg,'obp':cPlayer.statsR.obp,'slg':cPlayer.statsR.slg,'pa':cPlayer.statsR.pa,'hr':cPlayer.statsR.hr,'k':cPlayer.statsR.k,'bb':cPlayer.statsR.bb}); 
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsL.avg,'obp':cPlayer.statsL.obp,'slg':cPlayer.statsL.slg,'pa':cPlayer.statsL.pa,'hr':cPlayer.statsL.hr,'k':cPlayer.statsL.k,'bb':cPlayer.statsL.bb});
  	   }
  	   }
  	   }
  	   storage.set('lineup'+gtype,oppLineup);
  	   var cPlayer;
  	   for (i=0;i<11;i++){

  	   cPlayer = pitchers[i];
  	   bullpen.push({'name':cPlayer.name,'throws':cPlayer.throws,'era':cPlayer.stats.era,'avg':cPlayer.stats.avg,'obp':cPlayer.stats.obp,'slg':cPlayer.stats.slg,'ip':cPlayer.stats.ip,'hr':cPlayer.stats.hr,'k':cPlayer.stats.k,'bb':cPlayer.stats.bb});
  	   bullpen.push({'name':cPlayer.name,'throws':cPlayer.throws,'era':cPlayer.statsR.era,'avg':cPlayer.statsR.avg,'obp':cPlayer.statsR.obp,'slg':cPlayer.statsR.slg,'ip':cPlayer.statsR.ip,'hr':cPlayer.statsR.hr,'k':cPlayer.statsR.k,'bb':cPlayer.statsR.bb}); 
  	   bullpen.push({'name':cPlayer.name,'throws':cPlayer.throws,'era':cPlayer.statsL.era,'avg':cPlayer.statsL.avg,'obp':cPlayer.statsL.obp,'slg':cPlayer.statsL.slg,'ip':cPlayer.statsL.ip,'hr':cPlayer.statsL.hr,'k':cPlayer.statsL.k,'bb':cPlayer.statsL.bb});

  	   }
  	   storage.set('bullpen'+gtype,bullpen);
  	   })
  	   })
     });
    console.log('created done');
  }
