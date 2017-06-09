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
import { CreategamePage } from '../creategame/creategame';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('swingCanvas') swingCanvas;

private oppOffense = 50;

  storage: Storage;
  allnicknames: string;
  oppPitcher: number = 50;
  myOffense: number = 50;
  myPitcher: number = 50;
  teams: Array<object> = [];
  contactInput: number = 50;
  powerInput: number = 50;



  constructor(public navCtrl: NavController, storage: Storage) {
	   this.storage = new Storage(Storage);
	   console.log(this.myPitcher);

	   this.storage.ready().then(() => {
	this.storage.get('teamList').then((idval) => {
	
	if (idval != null)
	{
	let i =0;
	for (i=0;i<idval.length;i++){
	this.storage.get(idval[i]).then((teamval) => { this.teams.push(teamval);})
	}
	}
	
	
	})

		})


	   


  }


loadSwing(){  

  let c = this.swingCanvas.nativeElement;
	   let ctx = c.getContext('2d');
	   let ixi = 0; let iyi = 0;
	   for (ixi=-50;ixi<150;ixi++){
	   for (iyi=-50;iyi<150;iyi++){
	   		let swp = Math.floor(swingPercentage([50,50,.92,.92,.06,.06],ixi,iyi)*256);
	   		let cp = Math.floor(swingPercentage([50,30,.92,.92,.2,.2],ixi,iyi)*256);
	   		let inp = Math.floor(swingPercentage([50,40,.8,.8,.05,.05],ixi,iyi)*256);
	   		let sp = Math.floor(swingPercentage([50,60,.45,.45,.1,.025],ixi,iyi)*256);
	   		let dp = Math.floor(swingPercentage([50,50,.25,.25,.1,.014],ixi,iyi)*256);
	   		let tp = Math.floor(swingPercentage([50,50,.08,.08,.1,.005],ixi,iyi)*256);
	   		let hp = Math.floor(swingPercentage([50,40,.24,.24,.025,.01],ixi,iyi)*256);

	   		let tcolor = "#"+toHex(256-swp*cp*inp*(sp+dp*2+tp*3+hp*4))+'00'+toHex(swp*cp*inp*(sp+dp*2+tp*3+hp*4));
	   		ctx.fillStyle=tcolor;
	   		ctx.fillRect(ixi*2+100,iyi*2+100,2,2);
	   		}
	   }
	   let outcomeList = ['Single','Double','Triple','Home Run','Strikeout','Walk','Out','Single','Double','Triple','Home Run','Strikeout','Walk','Out','Single','Double','Triple','Home Run','Strikeout','Walk','Out'];
	   for (ixi=-5;ixi<15;ixi++){
	   for (iyi=-5;iyi<15;iyi++){

	   		let swp = swingPercentage([50,50,.92,.92,.06,.06],ixi*10,iyi*10);
	   		let cp = swingPercentage([50,30,.92,.92,.2,.2],ixi*10,iyi*10);
	   		let inp = swingPercentage([50,40,.8,.8,.05,.05],ixi*10,iyi*10);
	   		let sp = swingPercentage([50,50,.45,.45,.1,.025],ixi*10,iyi*10);
	   		let dp = swingPercentage([50,50,.25,.25,.1,.014],ixi*10,iyi*10);
	   		let tp = swingPercentage([50,50,.08,.08,.1,.005],ixi*10,iyi*10);
	   		let hp = swingPercentage([50,50,.24,.24,.025,.01],ixi*10,iyi*10);
	   		let slgp = (swp*cp*inp*(sp+dp*2+tp*3+hp*4)).toFixed(2).substring(2,);

	   		let batter = createBatter27({'id':1,'cInput':this.contactInput,'pInput':this.powerInput});
	   		let tbPt = 0;
	   		let ttPt = 0;
	   		let i = 0;
	   		for (i=0;i<10000;i++){
	   			let resultAB = oneAB(batter);
	   			if (resultAB == outcomeList[ixi+5]){tbPt++;}


	   		}
	   		slgp = (tbPt/10000.).toFixed(3).substring(2,); 

	   		ctx.fillStyle='#FFFFFF';
	   		ctx.font = "10px Arial";
            ctx.fillText(slgp.toString(),ixi*20+100,iyi*20+100);
	   		}
	   }
	   ctx.moveTo(100,100);
	   ctx.lineTo(300,100);
	   ctx.lineTo(300,300);
	   ctx.lineTo(100,300);
	   ctx.lineTo(100,100);
	   ctx.stroke();

	   }



  continueGame(){
	this.storage.ready().then(() => {
		this.storage.set('gametype','');
		})
  	this.navCtrl.push(GamePage);}

  bust27(){
  	this.storage.ready().then(() => {
		this.storage.get('first27').then(val => {if (val != null){console.log('do nothing');} else {console.log('create');

			this.storage.set('team27bust1', createTeam27());
			 this.storage.set('first27',true);
		 console.log('create the team');
		}
		})
		})
  	
  	this.newGame('27',[[0],[],[0,0,0],[0,0,0]],[0,0,0,0,[0,0,0]],15,'team27bust1');
	this.storage.ready().then(() => {
		this.storage.set('gametype','27');
		})

  	this.navCtrl.push(Bust27Page);}

  nothing(){
  this.newGame('nothing');
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


	this.navCtrl.push(CreateteamPage);
	}
  editTeam(){

	this.navCtrl.push(EditteamPage);
	}
  viewTeam(){
	this.storage.ready().then(() => {
	this.storage.get('teamList').then((val) => {
	console.log(val);
	})

		})
	}

  newGame(gtype,linescoreInit=[[0],[],[0,0,0],[0,0,0]],situationInit=[0,0,0,0,[0,0,0]],pitcherInit=15,awayTeamInit='team0',homeTeamInit='team0'){
  if (gtype==''){
     this.navCtrl.push(CreategamePage);
     }
    else{

  	this.storage.ready().then(() => {
		this.storage.set('gametype',gtype);

  	   this.storage.set('currentSequence'+gtype, []);
  	   
  	   this.storage.set('situation'+gtype, situationInit);
  	   this.storage.set('linescore'+gtype,linescoreInit);
  	   this.storage.set('currentPitcher'+gtype,pitcherInit);
  	   this.storage.set('awayTeam'+gtype,awayTeamInit);
  	   this.storage.set('homeTeam'+gtype,homeTeamInit);

  	   this.storage.get(awayTeamInit).then(val => {
  	   	   let batters = val.batters
	  	   let oppLineup = [];
	  	   let i = 0;
	  	   for (i=1;i<28;i++){
	  	   let ii =0;
	  	   for (ii=0;ii<27;ii++){
	  	   if (batters[ii]['order']==i){
	  	   let cPlayer = batters[ii];
	  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.stats.avg,'obp':cPlayer.stats.obp,'slg':cPlayer.stats.slg,'pa':cPlayer.stats.pa,'hr':cPlayer.stats.hr,'k':cPlayer.stats.k,'bb':cPlayer.stats.bb});
	  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsR.avg,'obp':cPlayer.statsR.obp,'slg':cPlayer.statsR.slg,'pa':cPlayer.statsR.pa,'hr':cPlayer.statsR.hr,'k':cPlayer.statsR.k,'bb':cPlayer.statsR.bb}); 
	  	   oppLineup.push({'name':cPlayer.name,'bats':cPlayer.bats,'avg':cPlayer.statsL.avg,'obp':cPlayer.statsL.obp,'slg':cPlayer.statsL.slg,'pa':cPlayer.statsL.pa,'hr':cPlayer.statsL.hr,'k':cPlayer.statsL.k,'bb':cPlayer.statsL.bb});
	  	   }
	  	   }
	  	   }
	  	   this.storage.set('lineup'+gtype,oppLineup);
	  	})


     });

    

     }
     
  }

}



function swingPercentage([maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey],xL,yL){
   let spx = (minValuex-maxValuex)/(100)**2*(xL-maxLocationx)**2+maxValuex;
   let spy = (minValuey-maxValuey)/(100)**2*(yL-maxLocationy)**2+maxValuey;
   let swingPercentage = Math.max(spx,0)*Math.max(spy,0);
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

function createTeam27(){
	console.log('cccc');
	let batters = [createBatter27({'id':1}),
	createBatter27({'id':2}),
	createBatter27({'id':3}),
	createBatter27({'id':4}),
	createBatter27({'id':5}),
	createBatter27({'id':6}),
	createBatter27({'id':7}),
	createBatter27({'id':8}),
	createBatter27({'id':9}),
	createBatter27({'id':10}),
	createBatter27({'id':11}),
	createBatter27({'id':12}),
	createBatter27({'id':13}),
	createBatter27({'id':14}),
	createBatter27({'id':15}),
	createBatter27({'id':16}),
	createBatter27({'id':17}),
	createBatter27({'id':18}),
	createBatter27({'id':19}),
	createBatter27({'id':20}),
	createBatter27({'id':21}),
	createBatter27({'id':22}),
	createBatter27({'id':23}),
	createBatter27({'id':24}),
	createBatter27({'id':25}),
	createBatter27({'id':26}),
	createBatter27({'id':27})];


	let name = '';	
	console.log('ddd');
	return {'teamId':'team27bust1','name':name,'batters':batters};

	
}

function createBatter27(batter){

		let id = batter.id;
		let contact = 50; let power = 50; let speed = 50; let defense = 50; let batsR = .75;
		if (id==1){	batter['position'] = 'C';         batsR = .95; contact = 0; power = 0; speed = 20; defense = 60; batter['order'] = 1; batter['name'] = createName();	}
		else if (id==2){	batter['position'] = '2B'; batsR = .35; contact = 10; power = 10; speed = 40; defense = 50; batter['order'] = 2; batter['name'] = createName();	}
		else if (id==3){	batter['position'] = 'SS'; batsR = .9; contact = 15; power = 15; speed = 70; defense = 60; batter['order'] = 3; batter['name'] = createName();	}
		else if (id==4){	batter['position'] = '3B'; batsR = .9; contact = 15; power = 15; speed = 75; defense = 60; batter['order'] = 4; batter['name'] = createName();	}
		else if (id==5){	batter['position'] = 'LF'; batsR = .9; contact = 20; power = 20; speed = 60; defense = 50; batter['order'] = 5; batter['name'] = createName();	}
		else if (id==6){	batter['position'] = 'RF'; batsR = .5; contact = 20; power = 20; speed = 60; defense = 70; batter['order'] = 6; batter['name'] = createName();    }
		else if (id==7){	batter['position'] = 'CF'; batsR = .5; contact = 25; power = 25; speed = 80; defense = 60; batter['order'] = 7; batter['name'] = createName();	}
		else if (id==8){	batter['position'] = '1B'; batsR = .5; contact = 25; power = 25; speed = 60; defense = 50; batter['order'] = 8; batter['name'] = createName();	}
		else if (id==9){	batter['position'] = 'DH'; batsR = .5; contact = 30; power = 30; speed = 40; defense = 50; batter['order'] = 9; batter['name'] = createName();	}
		else if (id==10){	batter['position'] = 'C'; batsR = .9; contact = 30; power = 30; speed = 70; defense = 70; batter['order'] = 10; batter['name'] = createName();	}
		else if (id==11){	batter['position'] = '2B'; batsR = .5; contact = 35; power = 35; speed = 70; defense = 80; batter['order'] = 11; batter['name'] = createName();	}
		else if (id==12){	batter['position'] = 'SS'; batsR = .85; contact = 35; power = 35; speed = 50; defense = 50; batter['order'] = 12; batter['name'] = createName();	}
		else if (id==13){	batter['position'] = '3B'; batsR = .95; contact = 40; power = 40; speed = 30; defense = 70; batter['order'] = 13; batter['name'] = createName();	}
		else if (id==14){	batter['position'] = 'LF'; batsR = .5; contact = 40; power = 40; speed = 80; defense = 50; batter['order'] = 14; batter['name'] = createName();	}
		else if (id==15){	batter['position'] = 'RF'; batsR = .9; contact = 45; power = 45; speed = 60; defense = 50; batter['order'] = 15; batter['name'] = createName();	}
		else if (id==16){	batter['position'] = 'CF'; batsR = .5; contact = 45; power = 45; speed = 60; defense = 70; batter['order'] = 16; batter['name'] = createName();    }
		else if (id==17){	batter['position'] = '1B'; batsR = .5; contact = 50; power = 50; speed = 80; defense = 60; batter['order'] = 17; batter['name'] = createName();	}
		else if (id==18){	batter['position'] = 'DH'; batsR = .5; contact = 50; power = 50; speed = 60; defense = 50; batter['order'] = 18; batter['name'] = createName();	}
		else if (id==19){	batter['position'] = 'C'; batsR = .5; contact = 55; power = 55; speed = 40; defense = 50; batter['order'] = 19; batter['name'] = createName();	}
		else if (id==20){	batter['position'] = '2B'; batsR = .9; contact = 55; power = 55; speed = 70; defense = 70; batter['order'] = 20; batter['name'] = createName();	}
		else if (id==21){	batter['position'] = 'SS'; batsR = .5; contact = 60; power = 60; speed = 70; defense = 80; batter['order'] = 21; batter['name'] = createName();	}
		else if (id==22){	batter['position'] = '3B'; batsR = .85; contact = 65; power = 65; speed = 50; defense = 50; batter['order'] = 22; batter['name'] = createName();	}
		else if (id==23){	batter['position'] = 'LF'; batsR = .95; contact = 70; power = 70; speed = 30; defense = 70; batter['order'] = 23; batter['name'] = createName();	}
		else if (id==24){	batter['position'] = 'RF'; batsR = .5; contact = 75; power = 75; speed = 80; defense = 50; batter['order'] = 24; batter['name'] = createName();	}
		else if (id==25){	batter['position'] = 'CF'; batsR = .9; contact = 80; power = 80; speed = 60; defense = 50; batter['order'] = 25; batter['name'] = createName();	}
		else if (id==26){	batter['position'] = '1B'; batsR = .5; contact = 85; power = 85; speed = 60; defense = 70; batter['order'] = 26; batter['name'] = createName();    }
		else if (id==27){	batter['position'] = 'DH'; batsR = .5; contact = 90; power = 90; speed = 80; defense = 60; batter['order'] = 27; batter['name'] = createName();	}

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

	let pname = batter.name;
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



    let swingMap = createSwing(contact,power);
    let contactMap = createContact(contact,power);
    let inplayMap = createInplay(contact,power);
    let SingleMap = createSingle(contact,power);
    let DoubleMap = createDouble(contact,power);
    let TripleMap = createTriple(contact,power,speed);
    let hrMap = createHr(contact,power);

    return {'id':id,'order':order,'position':position,'name':pname,'stats':statshold,'statsL':statsLhold,'statsR':statsRhold,'bats':bats,'zones':zoneshold, 'swingMap':swingMap, 'contactMap':contactMap, 'inplayMap':inplayMap, 'SingleMap':SingleMap, 'DoubleMap':DoubleMap, 'TripleMap':TripleMap, 'hrMap':hrMap,'contact':batter.contact,'power':batter.power,'speed':batter.speed,'defense':batter.defense};
    
}

function createPitcher(pitcher,init=false){
	let pitchertemp = pitcher;
	let velocity = 50;
	let control = 50;
	let movement = 50;
	let stamina = 50;
	if (init){
	let position = 'SP';
	if (pitcher.id<20){position = 'SP';}
	else if (pitcher.id==20){position='CL';}
	else {position = 'RP';}
	if (pitcher.id==15){velocity = 94; control = 90; movement = 90; stamina = 90;}
	if (pitcher.id==16){velocity = 91; control = 85; movement = 85; stamina = 85;}
	if (pitcher.id==17){velocity = 89; control = 80; movement = 80; stamina = 80;}
	if (pitcher.id==18){velocity = 88; control = 80; movement = 75; stamina = 80;}
	if (pitcher.id==19){velocity = 87; control = 70; movement = 70; stamina = 75;}
	if (pitcher.id==20){velocity = 97; control = 85; movement = 95; stamina = 35;}
	if (pitcher.id==21){velocity = 94; control = 80; movement = 80; stamina = 45;}
	if (pitcher.id==22){velocity = 90; control = 60; movement = 80; stamina = 45;}
	if (pitcher.id==23){velocity = 88; control = 70; movement = 80; stamina = 65;}
	if (pitcher.id==24){velocity = 92; control = 70; movement = 80; stamina = 45;}
	if (pitcher.id==25){velocity = 88; control = 90; movement = 80; stamina = 35;}


	velocity = Math.floor(velocity-2+Math.random()*5);
	control = Math.floor(control-5+Math.random()*10);
	movement = Math.floor(movement-5+Math.random()*10);
	stamina = Math.floor(stamina-5+Math.random()*10);
	let throws = 'R';
	let thrown = 1;
	if (throws == 'R'){thrown = 1;}
	else {thrown = -1;}

	let pitch1 = {'name':'','id':1,'velocity':50,'movement':[50,50],'control':50};
	let pitch2 = {'name':'','id':2,'velocity':50,'movement':[50,50],'control':50};
	let pitch3 = {'name':'','id':3,'velocity':50,'movement':[50,50],'control':50};
	let pitch4 = {'name':'','id':4,'velocity':50,'movement':[50,50],'control':50};
	let pitch5 = {'name':'','id':5,'velocity':50,'movement':[50,50],'control':50};


	pitch1 = {'name':'FastBall','id':1,'velocity':velocity,'movement':[Math.floor(movement/100*thrown*10),Math.floor(movement/100*thrown*5)],'control':control};
	pitch2 = {'name':'Changeup','id':2,'velocity':velocity-10,'movement':[Math.floor(movement/100*thrown*30),Math.floor(movement/100*thrown*20)],'control':control-15};
	pitch3 = {'name':'Curve','id':3,'velocity':velocity-13,'movement':[Math.floor(movement/100*thrown*-20),Math.floor(movement/100*thrown*50)],'control':control-20};
	if (pitcher.id < 20){
	pitch4 = {'name':'Cutter','id':4,'velocity':velocity-4,'movement':[Math.floor(movement/100*thrown*-20),Math.floor(movement/100*thrown*10)],'control':control-10};
	}
	if (pitcher.id < 18){
	pitch5 = {'name':'Slider','id':5,'velocity':velocity-7,'movement':[Math.floor(movement/100*thrown*-30),Math.floor(movement/100*thrown*30)],'control':control-15};
	}


	pitchertemp = {'id':pitcher.id,'name':createName(),'position':position,'throws':throws,'velocity':velocity,'control':control,'movement':movement,'stamina':stamina,'pitch':[pitch1,pitch2,pitch3,pitch4,pitch5],'velocityold':velocity,'controlold':control,'movementold':movement};
	pitcher = pitchertemp;


	}
	let pname = pitcher.name;
	let id = pitcher.id;
	let throws = pitcher.throws;
	let position = pitcher.position;
	let pitch1 = pitcher.pitch[0];
	let pitch2 = pitcher.pitch[1];
	let pitch3 = pitcher.pitch[2];
	let pitch4 = pitcher.pitch[3];
	let pitch5 = pitcher.pitch[4];


	pitch1 = {'name':pitcher.pitch[0].name,'id':pitcher.pitch[0].id,'velocity':pitcher.pitch[0].velocity,'movement':[pitcher.pitch[0].movement[0],pitcher.pitch[0].movement[1]],'control':pitcher.pitch[0].control};
	pitch2 = {'name':pitcher.pitch[1].name,'id':pitcher.pitch[1].id,'velocity':pitcher.pitch[1].velocity,'movement':[pitcher.pitch[1].movement[0],pitcher.pitch[1].movement[1]],'control':pitcher.pitch[1].control};
	pitch3 = {'name':pitcher.pitch[2].name,'id':pitcher.pitch[2].id,'velocity':pitcher.pitch[2].velocity,'movement':[pitcher.pitch[2].movement[0],pitcher.pitch[2].movement[1]],'control':pitcher.pitch[2].control};
	pitch4 = {'name':pitcher.pitch[3].name,'id':pitcher.pitch[3].id,'velocity':pitcher.pitch[3].velocity,'movement':[pitcher.pitch[3].movement[0],pitcher.pitch[3].movement[1]],'control':pitcher.pitch[3].control};
	pitch5 = {'name':pitcher.pitch[4].name,'id':pitcher.pitch[4].id,'velocity':pitcher.pitch[4].velocity,'movement':[pitcher.pitch[4].movement[0],pitcher.pitch[4].movement[1]],'control':pitcher.pitch[4].control};
	let i = 0;
	let numPitches =0;
	for (i=0;i<5;i++){
	if (pitcher.pitch[i].name != ''){
		numPitches++;
	}
	}

	

	return {'id':id,'name':pname,'numPitches':numPitches,'throws':throws,'position':position,'velocity':velocity,'control':control,'movement':movement,'stamina':stamina,'pitch1':pitch1,'pitch2':pitch2,'pitch3':pitch3,'pitch4':pitch4,'pitch5':pitch5,'pitch':[pitch1,pitch2,pitch3,pitch4,pitch5],'velocityold':velocity,'controlold':control,'movementold':movement};
}

function createName(){
	let firstNames = [ ['James','3.318'],['John','3.271'],['Robert','3.143'],['Michael','2.629'],['William','2.451'],['David','2.363'],['Richard','1.703'],['Charles','1.523'],['Joseph','1.404'],['Thomas','1.38']];
	let i = 0; let sumWeights = 0;
	for (i=0;i<firstNames.length;i++){
		sumWeights = sumWeights+parseFloat(firstNames[i][1]);
	}
	let sumRunning = 0;
	let xRandom = Math.random();
	let firstName = firstNames[firstNames.length-1][0];
	for (i=0;i<firstNames.length;i++){
		if(xRandom > sumRunning/sumWeights){firstName = firstNames[i][0];}
		sumRunning += parseFloat(firstNames[i][1]);
	}
	return firstName+' Johnson';
}

function createSwing(contact, power){
	let maxLocationx = 50;
    let maxLocationy = 40;
    let maxValuex = .85*Math.sqrt(Math.max(contact*.005+.6,.35));
    let maxValuey = .9*Math.sqrt(Math.max(contact*.005+.6,.35));
    let minValuex = .25/Math.sqrt(Math.max(contact*.005+.6,.35));
    let minValuey = .16/Math.sqrt(Math.max(contact*.005+.6,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createContact(contact, power){
	let maxLocationx = 60;
    let maxLocationy = 65;
    let maxValuex = .92*Math.sqrt(Math.max(contact*.005+.6,.35));
    let maxValuey = .95*Math.sqrt(Math.max(contact*.005+.6,.35));
    let minValuex = .4*Math.sqrt(Math.max(contact*.005+.6,.35));
    let minValuey = .3*Math.sqrt(Math.max(contact*.005+.6,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createInplay(contact, power){
	let maxLocationx = 50;
    let maxLocationy = 65;
    let maxValuex = .77;
    let maxValuey = .78;
    let minValuex = .35;
    let minValuey = .2;
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createSingle(contact, power){
	let maxLocationx = 50;
    let maxLocationy = 60;
    let maxValuex = .465*Math.sqrt(Math.max(contact*.0275-1,.35))*Math.sqrt(Math.max(power*-.006+1.5,.35));
    let maxValuey = .465*Math.sqrt(Math.max(contact*.0275-1,.35))*Math.sqrt(Math.max(power*-.006+1.5,.35));
    let minValuex = .25*Math.sqrt(Math.max(contact*.0275-1,.35))*Math.sqrt(Math.max(power*-.006+1.5,.35));
    let minValuey = .15*Math.sqrt(Math.max(contact*.0275-1,.35))*Math.sqrt(Math.max(power*-.006+1.5,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createDouble(contact, power){
	let maxLocationx = 50;
    let maxLocationy = 60;
    let maxValuex = .26*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35));
    let maxValuey = .28*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35));
    let minValuex = .14*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35));
    let minValuey = .07*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createTriple(contact, power,speed){
	let maxLocationx = 50;
    let maxLocationy = 50;
    let maxValuex = .094*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35))*Math.sqrt(Math.max(speed*.05-3,.35));
    let maxValuey = .094*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35))*Math.sqrt(Math.max(speed*.05-3,.35));
    let minValuex = .027*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35))*Math.sqrt(Math.max(speed*.05-3,.35));
    let minValuey = .008*Math.sqrt(Math.max(contact*.0105+.25,.35))*Math.sqrt(Math.max(power*.0105+.25,.35))*Math.sqrt(Math.max(speed*.05-3,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}

function createHr(contact, power){
	let maxLocationx = 50;
    let maxLocationy = 40;
    let maxValuex = .27*Math.sqrt(Math.max(contact*-.011+1.86,.35))*Math.sqrt(Math.max(power*.061-3.9,.35));
    let maxValuey = .27*Math.sqrt(Math.max(contact*-.011+1.86,.35))*Math.sqrt(Math.max(power*.061-3.9,.35));
    let minValuex = -.04/Math.sqrt(Math.max(contact*-.011+1.86,.35))/Math.sqrt(Math.max(power*.061-3.9,.35));
    let minValuey = -.1/Math.sqrt(Math.max(contact*-.011+1.86,.35))/Math.sqrt(Math.max(power*.061-3.9,.35));
    return [maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey];
}
function oneAB(batter){
	let Balls = 0;
	let Strikes = 0;
	let moreAB = true;
	let result = [];
	while (moreAB){
	let randLoc = Math.random();
	let probLoc = [.13,.08,.03,.04,.03,.05,.06,.05,.05,.05,.05,.18,.20];
	let i =0;
	let sumProb = 0;
	let zone = 12;
	let tx = 0;
	let ty = 0;
	for (i=0;i<13;i++){
		sumProb = sumProb+probLoc[i];
		if (randLoc<sumProb){
			zone = i;
			break;
		}
	}
	if (zone==2){tx=Math.floor(Math.random()*33); ty= Math.floor(Math.random()*33);}
	else if (zone==3){tx=33+Math.floor(Math.random()*33); ty= Math.floor(Math.random()*33);}
	else if (zone==4){tx=67+Math.floor(Math.random()*33); ty= Math.floor(Math.random()*33);}
	else if (zone==5){tx=Math.floor(Math.random()*33); ty= 33+Math.floor(Math.random()*33);}
	else if (zone==6){tx=33+Math.floor(Math.random()*33); ty= 33+Math.floor(Math.random()*33);}
	else if (zone==7){tx=67+Math.floor(Math.random()*33); ty= 33+Math.floor(Math.random()*33);}
	else if (zone==8){tx=Math.floor(Math.random()*33); ty= 67+Math.floor(Math.random()*33);}
	else if (zone==9){tx=33+Math.floor(Math.random()*33); ty= 67+Math.floor(Math.random()*33);}
	else if (zone==10){tx=67+Math.floor(Math.random()*33); ty= 67+Math.floor(Math.random()*33);}
	else if (zone==0){tx=-33+Math.floor(Math.random()*33*4); ty= -33+Math.floor(Math.random()*33);}
	else if (zone==1){tx=100+Math.floor(Math.random()*33); ty= -33+Math.floor(Math.random()*33*4);}
	else if (zone==11){tx=-33+Math.floor(Math.random()*33); ty= Math.floor(Math.random()*33*4);}
	else if (zone==12){tx=Math.floor(Math.random()*33*4); ty= 100+Math.floor(Math.random()*33);}
	result = pitch(tx,ty,Balls,Strikes,batter);
	moreAB = result[2];
	if (moreAB){
	Balls = result[0];
	Strikes = result[1];
	}
	}
	return result[3];
	
}
function fullAB(tx,ty,batter){
	let Balls = 0;
	let Strikes = 0;
	let moreAB = true;
	let result = [];
	while (moreAB){
	result = pitch(tx,ty,Balls,Strikes,batter);
	moreAB = result[2];
	if (moreAB){
	Balls = result[0];
	Strikes = result[1];
	}
	}
	return result[3];
}

function pitch(tx,ty,Balls,Strikes,batter){
	let result = determinePlay(tx,ty,Balls,Strikes,batter);

	if (result == 'Ball'){if (Balls==3){return [0,0,false,'Walk'];} else {return [++Balls,Strikes,true,''];}}
	else if (result == 'Swinging Strike'){if (Strikes==2){return [0,0,false,'Strikeout'];} else {return [Balls,++Strikes,true,''];}}
	else if (result == 'Strike'){if (Strikes==2){return [0,0,false,'Strikeout'];} else {return [Balls,++Strikes,true,''];}}
	else if (result == 'Foul'){if (Strikes==2){return [0,0,true,''];} else {return [Balls,++Strikes,true,''];}}
	else {return [0,0,false,result];}
	
}


function determinePlay(touchx,touchy,Balls, Strikes,batter){

	let isStrike = makeCall(touchx,touchy);
    let isSwing = makeSwing(touchx,touchy,batter.swingMap,[Balls,Strikes]);
    if (isSwing=='swing'){
        let isContact = makeContact(touchx,touchy,batter.contactMap,batter.inplayMap,batter.bats);
        if (isContact=='Fair'){
            let isPlay = makePlay(touchx,touchy,batter.SingleMap,batter.DoubleMap,batter.TripleMap,batter.hrMap);
            return isPlay;
        }
        else if (isContact=='Foul'){return 'Foul';}
        else {return 'Swinging Strike';}
    }
    else{
    	return isStrike;
    	
    }

    
}

function makeCall(tx,ty){
    let thecall = 'Ball';

   	let StrikeProb = Math.min(Math.max((8.+tx)/16.,0),1)*Math.min(Math.max((8.+ty)/16.,0),1)*Math.min(Math.max((8.+100-tx)/16.,0),1)*Math.min(Math.max((8.+100-ty)/16.,0),1);
   	if (Math.random()<StrikeProb){thecall='Strike';}
    return thecall;
}

function makeSwing(tx,ty,swingMap,count){
    let theSwing = 'take';
    let LswingMap = [];
    let i = 0;
    for (i=0;i<6;i++){
    LswingMap.push(swingMap[i]);
    }

    let percentSwing = 0;
    if (count[1]==2){
    LswingMap[2]=swingMap[2]+.11;
    LswingMap[3]=swingMap[3]+.11;
    LswingMap[4]=swingMap[4]+.2;
    LswingMap[5]=swingMap[5]+.2;
    }
    else if (count[1]==1 && (count[0]==1 || count[0]==2)){
    LswingMap[2]=swingMap[2]+.08;
    LswingMap[3]=swingMap[3]+.08;
    LswingMap[4]=swingMap[4]+.12;
    LswingMap[5]=swingMap[5]+.12;
    }
    else if (count[1]==0 && (count[0]==1 || count[0]==2)){
    LswingMap[2]=swingMap[2]-.025;
    LswingMap[3]=swingMap[3]-.025;
    LswingMap[4]=swingMap[4]-.1;
    LswingMap[5]=swingMap[5]-.1;
    }
    else if (count[1]==1 && (count[0]==3 || count[0]==0)){

    LswingMap[2]=swingMap[2]+.075;
    LswingMap[3]=swingMap[3]+.075;
    LswingMap[4]=swingMap[4]+.025;
    LswingMap[5]=swingMap[5]+.025;
    }
    else if (count[1]==0 && count[0]==3){
    LswingMap[2]=swingMap[2]-.45;
    LswingMap[3]=swingMap[3]-.45;
    LswingMap[4]=swingMap[4]-.5;
    LswingMap[5]=swingMap[5]-.5;
    }
    else if (count[1]==0 && count[0]==0){
    LswingMap[2]=swingMap[2]-.16;
    LswingMap[3]=swingMap[3]-.16;
    LswingMap[4]=swingMap[4]-.21;
    LswingMap[5]=swingMap[5]-.21;
    
    }

    percentSwing = swingPercentage([LswingMap[0],LswingMap[1],LswingMap[2],LswingMap[3],LswingMap[4],LswingMap[5]],tx,ty);
    if (Math.random()<percentSwing){
    theSwing = 'swing';
    }

    return theSwing;
 }

 function makeContact(tx,ty,contactMap,inplayMap,bats){
 	if (bats=='R'){
 	contactMap[0]=60;
 	}
 	else{
 	contactMap[0]=40;
 	}
    let theContact = 'Miss';
    let percentContact = swingPercentage(contactMap,tx,ty);
    if (Math.random()<percentContact){
    	let percentFair = swingPercentage(inplayMap,tx,ty);
    	if (Math.random()<percentFair){
    		theContact = 'Fair';
    	}
    	else{
    		theContact = 'Foul';
    	}
    
    }

    return theContact;
 }

  function makePlay(tx,ty,SingleMap,DoubleMap,TripleMap,hrMap){
    let thePlay = 'Out';

	let xr = Math.random();
    if (xr<swingPercentage(SingleMap,tx,ty)){
    thePlay = 'Single';
    }
    else if (xr<swingPercentage(SingleMap,tx,ty)+swingPercentage(DoubleMap,tx,ty)){
    thePlay = 'Double';
    }
    else if (xr<swingPercentage(SingleMap,tx,ty)+swingPercentage(DoubleMap,tx,ty)+swingPercentage(TripleMap,tx,ty)){
    thePlay = 'Triple';
    }
    else if (xr<swingPercentage(SingleMap,tx,ty)+swingPercentage(DoubleMap,tx,ty)+swingPercentage(TripleMap,tx,ty)+swingPercentage(hrMap,tx,ty)){
    thePlay = 'Home Run';
    }
    return thePlay;
 }

