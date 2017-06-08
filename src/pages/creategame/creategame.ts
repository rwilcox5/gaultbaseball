import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GamePage } from '../game/game';

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
  batters = [createBatter({'id':1},true),createBatter({'id':2},true),createBatter({'id':3},true),createBatter({'id':4},true),createBatter({'id':5},true),createBatter({'id':6},true),createBatter({'id':7},true),createBatter({'id':8},true),createBatter({'id':9},true),createBatter({'id':10},true),createBatter({'id':11},true),createBatter({'id':12},true),createBatter({'id':13},true),createBatter({'id':14},true)];
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

  newGame(linescoreInit=[[0],[],[0,0,0],[0,0,0]],situationInit=[0,0,0,0,[0,0,0]]){

  	this.storage.ready().then(() => {
		this.storage.set('gametype','');
		})
   
	this.storage.ready().then(() => {
		let oppLineup = [];
		this.storage.set('nicknames', ['Apollo','Buttermilk','Catfish','Destroyer','Elephant','Foxy','Gunner','Harpoon','Ikabod']);



	   this.storage.set('awayTeam', this.opponent);



  	   this.storage.set('currentSequence', []);
  	   
  	   this.storage.set('situation', situationInit);
  	   this.storage.set('linescore',linescoreInit);
  	   this.storage.set('currentPitcher',this.mypitcher);
  	   this.storage.set('homeTeam',this.myteam);
  	   
  	   let i = 0;
  	   for (i=1;i<10;i++){
  	   let ii =0;
  	   for (ii=0;ii<14;ii++){
  	   if (this.batters[ii]['order']==i){
  	   let cPlayer = this.batters[ii];
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.stats.avg,'obp':cPlayer.stats.obp,'slg':cPlayer.stats.slg,'pa':cPlayer.stats.pa,'hr':cPlayer.stats.hr,'k':cPlayer.stats.k,'bb':cPlayer.stats.bb});
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsR.avg,'obp':cPlayer.statsR.obp,'slg':cPlayer.statsR.slg,'pa':cPlayer.statsR.pa,'hr':cPlayer.statsR.hr,'k':cPlayer.statsR.k,'bb':cPlayer.statsR.bb}); 
  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsL.avg,'obp':cPlayer.statsL.obp,'slg':cPlayer.statsL.slg,'pa':cPlayer.statsL.pa,'hr':cPlayer.statsL.hr,'k':cPlayer.statsL.k,'bb':cPlayer.statsL.bb});
  	   }
  	   }
  	   }
  	   this.storage.set('lineup',oppLineup);
     });
     this.navCtrl.push(GamePage);
     
     
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


function createBatter(batter,init=false){
	if (init){
		let id = batter.id;
		let contact = 50; let power = 50; let speed = 50; let defense = 50; let batsR = .75;
		if (id==1){	batter['position'] = 'C';         batsR = .95; contact = 30; power = 40; speed = 20; defense = 60; batter['order'] = 9; batter['name'] = 'John K. Placeholder III';	}
		else if (id==2){	batter['position'] = '1B'; batsR = .35; contact = 70; power = 80; speed = 40; defense = 50; batter['order'] = 3; batter['name'] = 'John';	}
		else if (id==3){	batter['position'] = '2B'; batsR = .9; contact = 40; power = 40; speed = 70; defense = 60; batter['order'] = 8; batter['name'] = 'John';	}
		else if (id==4){	batter['position'] = 'SS'; batsR = .9; contact = 70; power = 60; speed = 75; defense = 60; batter['order'] = 2; batter['name'] = 'John';	}
		else if (id==5){	batter['position'] = '3B'; batsR = .9; contact = 50; power = 60; speed = 60; defense = 50; batter['order'] = 6; batter['name'] = 'John';	}
		else if (id==6){	batter['position'] = 'LF'; batsR = .5; contact = 60; power = 50; speed = 60; defense = 70; batter['order'] = 7; batter['name'] = 'John';    }
		else if (id==7){	batter['position'] = 'CF'; batsR = .5; contact = 80; power = 60; speed = 80; defense = 60; batter['order'] = 1; batter['name'] = 'John';	}
		else if (id==8){	batter['position'] = 'RF'; batsR = .5; contact = 65; power = 80; speed = 60; defense = 50; batter['order'] = 4; batter['name'] = 'John';	}
		else if (id==9){	batter['position'] = '1B'; batsR = .5; contact = 55; power = 75; speed = 40; defense = 50; batter['order'] = 5; batter['name'] = 'John';	}
		else if (id==10){	batter['position'] = 'SS'; batsR = .9; contact = 50; power = 50; speed = 70; defense = 70; batter['order'] = 10; batter['name'] = 'John';	}
		else if (id==11){	batter['position'] = 'CF'; batsR = .5; contact = 60; power = 60; speed = 70; defense = 80; batter['order'] = 10; batter['name'] = 'John';	}
		else if (id==12){	batter['position'] = '3B'; batsR = .85; contact = 40; power = 50; speed = 50; defense = 50; batter['order'] = 10; batter['name'] = 'John';	}
		else if (id==13){	batter['position'] = 'C'; batsR = .95; contact = 30; power = 30; speed = 30; defense = 70; batter['order'] = 10; batter['name'] = 'John';	}
		else if (id==14){	batter['position'] = 'RF'; batsR = .5; contact = 40; power = 70; speed = 80; defense = 50; batter['order'] = 10; batter['name'] = 'John';	}

		if (Math.random()<batsR){batter['bats']='R';}
		else{		batter['bats']='L';		}
		if (contact<50){batter['contact'] = Math.floor(contact*Math.random()+contact/2.);}
		else{batter['contact'] = 100-Math.floor((100-contact)*Math.random()+(100-contact)/2.);}
		if (power<50){batter['power'] = Math.floor(power*Math.random()+power/2.);}
		else{batter['power'] = 100-Math.floor((100-power)*Math.random()+(100-power)/2.);}
		if (speed<50){batter['speed'] = Math.floor(speed*Math.random()+speed/2.);}
		else{batter['speed'] = 100-Math.floor((100-speed)*Math.random()+(100-speed)/2.);}
		if (defense<50){batter['defense'] = Math.floor(defense*Math.random()+defense/2.);}
		else{batter['defense'] = 100-Math.floor((100-defense)*Math.random()+(100-defense)/2.);}

		return createBatter(batter);

	}
	else{
	let pname = batter.name;
	let id = batter.id;
	let position = batter.position;
	let bats = batter.bats;
	let order = batter.order;
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

    let maxLocationx = 50;
    let maxLocationy = 50;
    let maxValuex = .92;
    let maxValuey = .92;
    let minValuex = .06;
    let minValuey = .06;
    let swingMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 30;
    maxValuex = .92;
    maxValuey = .92;
    minValuex = .2;
    minValuey = .2;
    let contactMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 40;
    maxValuex = .8;
    maxValuey = .8;
    minValuex = .05;
    minValuey = .05;
    let inplayMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 60;
    maxValuex = .45;
    maxValuey = .45;
    minValuex = .1;
    minValuey = .025;
    let singleMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 50;
    maxValuex = .25;
    maxValuey = .25;
    minValuex = .1;
    minValuey = .014;
    let doubleMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 50;
    maxValuex = .08;
    maxValuey = .08;
    minValuex = .1;
    minValuey = .005;
    let tripleMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];

    maxLocationx = 50;
    maxLocationy = 40;
    maxValuex = .24;
    maxValuey = .24;
    minValuex = .025;
    minValuey = .01;
    let hrMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];


    return {'id':id,'order':order,'position':position,'name':pname,'stats':statshold,'statsL':statsLhold,'statsR':statsRhold,'bats':bats,'zones':zoneshold, 'swingMap':swingMap, 'contactMap':contactMap, 'inplayMap':inplayMap, 'singleMap':singleMap, 'doubleMap':doubleMap, 'tripleMap':tripleMap, 'hrMap':hrMap,'contact':batter.contact,'power':batter.power,'speed':batter.speed,'defense':batter.defense};
    }
}
