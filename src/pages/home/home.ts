import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('swingCanvas') swingCanvas;
  storage: Storage;
  allnicknames: string;

  constructor(public navCtrl: NavController, storage: Storage) {
	   this.storage = new Storage(Storage);


  }


loadSwing(){  

  let c = this.swingCanvas.nativeElement;
	   let ctx = c.getContext('2d');
	   let ixi = 0; let iyi = 0;
	   for (ixi=-50;ixi<150;ixi++){
	   for (iyi=-50;iyi<150;iyi++){
	   		let swp = Math.floor(swingPercentage(ixi,iyi)*256);
	   		let tcolor = "#"+toHex(256-swp)+'00'+toHex(swp);
	   		ctx.fillStyle=tcolor;
	   		ctx.fillRect(ixi*2+100,iyi*2+100,2,2);
	   		}
	   }
	   for (ixi=-5;ixi<15;ixi++){
	   for (iyi=-5;iyi<15;iyi++){
	   		let swp = swingPercentage(ixi*10,iyi*10).toFixed(2);
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


  continueGame(){this.navCtrl.push(GamePage);}
 
  newGame(){
   
	this.storage.ready().then(() => {

	   this.storage.get('nicknames').then((val) => {
	   this.allnicknames = val[0]; this.storage.set('player1', createPlayer(this.allnicknames));
	   this.allnicknames = val[1]; this.storage.set('player2', createPlayer(this.allnicknames));
	   this.allnicknames = val[2]; this.storage.set('player3', createPlayer(this.allnicknames));
	   this.allnicknames = val[3]; this.storage.set('player4', createPlayer(this.allnicknames));
	   this.allnicknames = val[4]; this.storage.set('player5', createPlayer(this.allnicknames));
	   this.allnicknames = val[1]; this.storage.set('player6', createPlayer(this.allnicknames));
	   this.allnicknames = val[2]; this.storage.set('player7', createPlayer(this.allnicknames));
	   this.allnicknames = val[3]; this.storage.set('player8', createPlayer(this.allnicknames));
	   this.allnicknames = val[4]; this.storage.set('player0', createPlayer(this.allnicknames));
	   });


  	   this.storage.set('currentSequence', [[12,16,20,5],[51,89,30,10]]);
  	   this.storage.set('situation', [0,0,0,1,[0,0,0]]);
  	   this.storage.set('linescore',[[0,0,0,0],[1,0,0],[0,1,0],[1,3,0]]);
  	   this.storage.set('currentPitcher',{'pitch1':{'name':'Fastball','velocity':88,'movement':[20,5],'control':80},'pitch2':{'name':'Curve','velocity':72,'movement':[-20,50],'control':70},'pitch3':{'name':'Slider','velocity':80,'movement':[-40,20],'control':75},'pitch4':{'name':'Changeup','velocity':75,'movement':[30,30],'control':80},'pitch5':{'name':'Splitter','velocity':80,'movement':[5,30],'control':65}});
     });

     this.navCtrl.push(GamePage);
  }

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
    return {'name':pname,'stats':statshold,'statsL':statsLhold,'statsR':statsRhold,'bats':'R','zones':zoneshold};
}

function swingPercentage(xL,yL){
   let maxLocationx = 60;
   let maxLocationy = 50;
   let maxValuex = .9;
   let maxValuey = .9;
   let n50x = .05;
   let n50y = .05;
   let spx = (n50x-maxValuex)/(100)**2*(xL-maxLocationx)**2+maxValuex;
   let spy = (n50y-maxValuey)/(100)**2*(yL-maxLocationy)**2+maxValuey;
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

