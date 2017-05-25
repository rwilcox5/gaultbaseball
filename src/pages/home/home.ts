import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GamePage } from '../game/game';
import { Bust27Page } from '../bust27/bust27';
import { NothingPage } from '../nothing/nothing';
import { SavePage } from '../save/save';
import { NobreaksPage } from '../nobreaks/nobreaks';
import { CreateteamPage } from '../createteam/createteam';
import { EditteamPage } from '../editteam/editteam';
import { ViewteamPage } from '../viewteam/viewteam';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
private oppOffense = 50;

  storage: Storage;
  allnicknames: string;
  oppPitcher: number = 50;
  myOffense: number = 50;
  myPitcher: number = 50;
  teams: Array<object> = [];

  constructor(public navCtrl: NavController, storage: Storage) {
	   this.storage = new Storage(Storage);
	   console.log(this.myPitcher);

	   this.storage.ready().then(() => {
	this.storage.get('teamList').then((idval) => {
	
	let i =0;
	for (i=0;i<idval.length;i++){
	console.log(idval[i]);
	this.storage.get(idval[i]).then((teamval) => {console.log(teamval.name); this.teams.push(teamval);})
	}
	
	
	})

		})


	   


  }

/**
loadSwing(){  

  let c = this.swingCanvas.nativeElement;
	   let ctx = c.getContext('2d');
	   let ixi = 0; let iyi = 0;
	   for (ixi=-50;ixi<150;ixi++){
	   for (iyi=-50;iyi<150;iyi++){
	   		let swp = Math.floor(swingPercentage([50,50,.9,.9,.05,.05],ixi,iyi)*256);
	   		let tcolor = "#"+toHex(256-swp)+'00'+toHex(swp);
	   		ctx.fillStyle=tcolor;
	   		ctx.fillRect(ixi*2+100,iyi*2+100,2,2);
	   		}
	   }
	   for (ixi=-5;ixi<15;ixi++){
	   for (iyi=-5;iyi<15;iyi++){
	   		let swp = swingPercentage([50,50,.9,.9,.05,.05],ixi*10,iyi*10).toFixed(2);
	   		ctx.fillStyle='#FFFFFF';
	   		ctx.font = "10px Arial";
            ctx.fillText(swp.toString(),ixi*20+100,iyi*20+100);
	   		}
	   }
	   ctx.moveTo(100,100);
	   ctx.lineTo(300,100);
	   ctx.lineTo(300,300);
	   ctx.lineTo(100,300);
	   ctx.lineTo(100,100);
	   ctx.stroke();

	   }
**/


  continueGame(){
	this.storage.ready().then(() => {
		this.storage.set('gametype','');
		})
  	this.navCtrl.push(GamePage);}

  bust27(){
	this.storage.ready().then(() => {
		this.storage.set('gametype','27');
		})

  	this.navCtrl.push(Bust27Page);}

  nothing(){
  	this.storage.ready().then(() => {
		this.storage.set('gametype','nothing');
		})
		this.navCtrl.push(NothingPage);}

  save(){
	this.newGame('save',[[0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[0,1,0],[1,3,0]],[2,0,0,1,[0,1,1]]);
    this.storage.ready().then(() => {
		this.storage.set('gametype','save');
		})
		this.navCtrl.push(SavePage);}

  nobreaks(){
	this.newGame('nobreaks',[[0,0,0,0,0,0],[1,0,0,0,0],[0,1,0],[1,3,0]],[2,0,0,1,[0,1,1]]);
    this.storage.ready().then(() => {
		this.storage.set('gametype','nobreaks');
		})
		this.navCtrl.push(NobreaksPage);}
 	
  createTeam(name='Frisco Friars', batterLevel=3,pitcherLevel=3){
	let i = 0;
	let batters = [];
	for (i=0;i<14;i++){
		batters.push(createPlayer('Billson'));
	}
	let pitchers = [];
	for (i=0;i<11;i++){
		pitchers.push(createPitcher('Aiden'));
	}

	let teamId = 'team0';
	let tList = [teamId];
	this.storage.ready().then(() => {
	this.storage.get('teamList').then((val) => {
	if (val != null){
	if (val.length>0){
	teamId = 'team'+(parseInt(val[val.length-1].substr(4,))+1).toString();
	tList = val;
	tList.push(teamId);
	}
	}
		this.storage.set(teamId, {'teamId':teamId,'name':name,'batters':batters,'pitchers':pitchers});
		this.storage.set('teamList',tList);
		this.teams.push({'teamId':teamId,'name':name,'batters':batters,'pitchers':pitchers});
		})
		})
	this.navCtrl.push(CreateteamPage);
	}

  viewTeam(){
	this.storage.ready().then(() => {
	this.storage.get('teamList').then((val) => {
	console.log(val);
	})

		})
	}

  newGame(gtype,linescoreInit=[[0],[],[0,0,0],[0,0,0]],situationInit=[0,0,0,1,[0,0,0]],pitcherInit=createPitcher('Jack')){
  	console.log(pitcherInit.pitch1.name);
  	this.storage.ready().then(() => {
		this.storage.set('gametype',gtype);
		})
   
	this.storage.ready().then(() => {
		this.storage.set('nicknames', ['Apollo','Buttermilk','Catfish','Destroyer','Elephant','Foxy','Gunner','Harpoon','Ikabod']);

	   this.storage.get('nicknames').then((val) => {
	   let i = 0;
	   let tlineup = [];
	   for (i=0;i<9;i++){
	   this.allnicknames = val[i];
	   let cPlayer = createPlayer(this.allnicknames);
	   this.storage.set('player'+(i+1).toString(), cPlayer); tlineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.stats.avg,'obp':cPlayer.stats.obp,'slg':cPlayer.stats.slg,'pa':cPlayer.stats.pa,'hr':cPlayer.stats.hr,'k':cPlayer.stats.k,'bb':cPlayer.stats.bb}); tlineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsR.avg,'obp':cPlayer.statsR.obp,'slg':cPlayer.statsR.slg,'pa':cPlayer.statsR.pa,'hr':cPlayer.statsR.hr,'k':cPlayer.statsR.k,'bb':cPlayer.statsR.bb}); tlineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsL.avg,'obp':cPlayer.statsL.obp,'slg':cPlayer.statsL.slg,'pa':cPlayer.statsL.pa,'hr':cPlayer.statsL.hr,'k':cPlayer.statsL.k,'bb':cPlayer.statsL.bb});
	   }

	   this.storage.set('lineup', tlineup);
	   });


  	   this.storage.set('currentSequence'+gtype, []);
  	   
  	   this.storage.set('situation'+gtype, situationInit);
  	   this.storage.set('linescore'+gtype,linescoreInit);
  	   this.storage.set('currentPitcher'+gtype,pitcherInit);
     });
     if (gtype==''){
     this.navCtrl.push(GamePage);
     }
  }

}


function createPitcher(pname){
	let pitch1 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80}; let pitch2 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80}; let pitch3 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80}; let pitch4 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80}; let pitch5 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80};

	pitch1 = {'name':'Fastball','velocity':88,'movement':[20,5],'control':80};
	pitch2 = {'name':'Changeup','velocity':75,'movement':[30,30],'control':80};
	pitch3 = {'name':'Slider','velocity':80,'movement':[-40,20],'control':75};
	/** pitch4 = {'name':'Curve','velocity':72,'movement':[-20,50],'control':70};
	pitch5 = {'name':'Splitter','velocity':80,'movement':[5,30],'control':65}; **/

	return {'name':pname,'numPitches':3,'pitch1':pitch1,'pitch2':pitch2,'pitch3':pitch3,'pitch4':pitch4,'pitch5':pitch5};
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

    let maxLocationx = 50;
    let maxLocationy = 50;
    let maxValuex = .9;
    let maxValuey = .9;
    let minValuex = .05;
    let minValuey = .05;
    let swingMap = [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
    return {'name':pname,'stats':statshold,'statsL':statsLhold,'statsR':statsRhold,'bats':'R','zones':zoneshold, 'swingMap':swingMap};
}

function swingPercentage([maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey],xL,yL){
   let spx = (minValuex-maxValuex)/(100)**2*(xL-maxLocationx)**2+maxValuex;
   let spy = (minValuey-maxValuey)/(100)**2*(yL-maxLocationy)**2+maxValuey;
   let swingPercentage = Math.max(spx*spy,0);
   return swingPercentage;
}

function toHex(n){
	let digit1 = Math.floor(n/16.);
	let digit2 = n%16;
	return dth(digit1)+dth(digit2);

}

function dth(n){
	if (n<10){
		return n.toString();
	}
	else if (n==10) {return 'A';}
	else if (n==11) {return 'B';}
	else if (n==12) {return 'C';}
	else if (n==13) {return 'D';}
	else if (n==14) {return 'E';}
	else if (n==15) {return 'F';}
}

