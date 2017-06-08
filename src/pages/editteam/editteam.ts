import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditteamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editteam',
  templateUrl: 'editteam.html',
})
export class EditteamPage {

	batterids = [];
	batters = [createBatter({'id':1},true),
	createBatter({'id':2},true),
	createBatter({'id':3},true),
	createBatter({'id':4},true),
	createBatter({'id':5},true),
	createBatter({'id':6},true),
	createBatter({'id':7},true),
	createBatter({'id':8},true),
	createBatter({'id':9},true),
	createBatter({'id':10},true),
	createBatter({'id':11},true),
	createBatter({'id':12},true),
	createBatter({'id':13},true),
	createBatter({'id':14},true)];

	
	pitcherids = [];
	pitchers = [createPitcher({'id':15},true),
	createPitcher({'id':16},true),
	createPitcher({'id':17},true),
	createPitcher({'id':18},true),
	createPitcher({'id':19},true),
	createPitcher({'id':20},true),
	createPitcher({'id':21},true),
	createPitcher({'id':22},true),
	createPitcher({'id':23},true),
	createPitcher({'id':24},true),
	createPitcher({'id':25},true)];

	name = '';


	teams: Array<object> = [];
	myteam: string = '';
	team: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    let i = 0;
  for (i=0;i<this.batters.length;i++){
  this.batterids.push(i);
  }
  for (i=0;i<this.pitchers.length;i++){
  this.pitcherids.push(i);
  }

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
    console.log('ionViewDidLoad EditteamPage');
  }

  chooseTeam(){
  	console.log(this.myteam);
  	this.storage.ready().then(() => {

		this.storage.get(this.myteam).then(val => {this.batters = val.batters; this.pitchers = val.pitchers; this.name = val.name;})
		})
  	this.team = true;
  }
  teamSelected(){
  return this.team;
  }


  teamForm(){
  console.log('form submitted');

	this.storage.ready().then(() => {

		this.storage.set(this.myteam, {'teamId':this.myteam,'name':this.name,'batters':this.batters,'pitchers':this.pitchers});
		})

  }

  updateSlider(pitcherId,pitchCat){

  let i = 0;
  if (pitchCat=='v'){
  for (i=0;i<5;i++){
  this.pitchers[pitcherId].pitch[i].velocity+=this.pitchers[pitcherId].velocity-this.pitchers[pitcherId].velocityold;
  }
  this.pitchers[pitcherId].velocityold = this.pitchers[pitcherId].velocity;
  }
  if (pitchCat=='c'){
  for (i=0;i<5;i++){
  this.pitchers[pitcherId].pitch[i].control+=this.pitchers[pitcherId].control-this.pitchers[pitcherId].controlold;
  }
  this.pitchers[pitcherId].controlold = this.pitchers[pitcherId].control;
  }
  if (pitchCat=='m'){
  for (i=0;i<5;i++){
  this.pitchers[pitcherId].pitch[i].movement[0]=this.pitchers[pitcherId].pitch[i].movement[0]*(this.pitchers[pitcherId].movement/this.pitchers[pitcherId].movementold);
  }
  this.pitchers[pitcherId].movementold = this.pitchers[pitcherId].movement;
  }

  }



}



function createBatter(batter,init=false){
	if (init){
		let id = batter.id;
		let contact = 50; let power = 50; let speed = 50; let defense = 50; let batsR = .75;
		if (id==1){	batter['position'] = 'C';         batsR = .95; contact = 30; power = 40; speed = 20; defense = 60; batter['order'] = 9; batter['name'] = createName();	}
		else if (id==2){	batter['position'] = '1B'; batsR = .35; contact = 70; power = 80; speed = 40; defense = 50; batter['order'] = 3; batter['name'] = createName();	}
		else if (id==3){	batter['position'] = '2B'; batsR = .9; contact = 40; power = 40; speed = 70; defense = 60; batter['order'] = 8; batter['name'] = createName();	}
		else if (id==4){	batter['position'] = 'SS'; batsR = .9; contact = 70; power = 60; speed = 75; defense = 60; batter['order'] = 2; batter['name'] = createName();	}
		else if (id==5){	batter['position'] = '3B'; batsR = .9; contact = 50; power = 60; speed = 60; defense = 50; batter['order'] = 6; batter['name'] = createName();	}
		else if (id==6){	batter['position'] = 'LF'; batsR = .5; contact = 60; power = 50; speed = 60; defense = 70; batter['order'] = 7; batter['name'] = createName();    }
		else if (id==7){	batter['position'] = 'CF'; batsR = .5; contact = 80; power = 60; speed = 80; defense = 60; batter['order'] = 1; batter['name'] = createName();	}
		else if (id==8){	batter['position'] = 'RF'; batsR = .5; contact = 65; power = 80; speed = 60; defense = 50; batter['order'] = 4; batter['name'] = createName();	}
		else if (id==9){	batter['position'] = '1B'; batsR = .5; contact = 55; power = 75; speed = 40; defense = 50; batter['order'] = 5; batter['name'] = createName();	}
		else if (id==10){	batter['position'] = 'SS'; batsR = .9; contact = 50; power = 50; speed = 70; defense = 70; batter['order'] = 10; batter['name'] = createName();	}
		else if (id==11){	batter['position'] = 'CF'; batsR = .5; contact = 60; power = 60; speed = 70; defense = 80; batter['order'] = 10; batter['name'] = createName();	}
		else if (id==12){	batter['position'] = '3B'; batsR = .85; contact = 40; power = 50; speed = 50; defense = 50; batter['order'] = 10; batter['name'] = createName();	}
		else if (id==13){	batter['position'] = 'C'; batsR = .95; contact = 30; power = 30; speed = 30; defense = 70; batter['order'] = 10; batter['name'] = createName();	}
		else if (id==14){	batter['position'] = 'RF'; batsR = .5; contact = 40; power = 70; speed = 80; defense = 50; batter['order'] = 10; batter['name'] = createName();	}

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
    maxLocationy = 40;
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


	pitch1 = {'name':'Fastball','id':1,'velocity':velocity,'movement':[Math.floor(movement/100*thrown*10),Math.floor(movement/100*thrown*5)],'control':control};
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

