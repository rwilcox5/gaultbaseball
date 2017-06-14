import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CentrallogicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'centrallogic',
  templateUrl: 'centrallogic.html'
})
export class CentrallogicComponent {




  constructor(public storage: Storage, public events: Events) {

  this.storage.ready().then(() => {
console.log('con got stored0');
       this.storage.get('gametype').then((gtval) => {
       console.log('con got stored5');
       })
       this.storage.get('gametype').then((gtval) => {
    let ccc = gtval;
    console.log('con got stored1');

  this.storage.get('currentSequence'+ccc).then((val) => {
  console.log('con got stored2');
  this.storage.get('linescore'+ccc).then((linescore) => {
  this.storage.get('situation'+ccc).then((situation) => {
  console.log('con got stored3');
  this.storage.get('currentPitcher'+ccc).then(currentPitcher => {
  this.storage.get('awayTeam'+ccc).then(ateamval => {
  this.storage.get('homeTeam'+ccc).then(hteamval => {
  console.log('con got stored4');
  	let pitcher = {};
     	storage.get(hteamval).then(teamobj => {
     	let i =0;
     	for (i=0;i<teamobj.pitchers.length;i++){
     	if (teamobj.pitchers[i].id==currentPitcher){
       pitcher = teamobj.pitchers[i];
       console.log(teamobj.pitchers[i].pitch1.movement);
       }
       }

    this.events.publish('centralSequence', val);
    this.events.publish('centralTap', situation); 
    this.events.publish('centralScore', linescore);
    this.events.publish('centralBatter',situation[3]%9+1);
    this.events.publish('centralPitcher',pitcher);
    console.log('pub events');
  })
  })
  })
  })
  })
  })
  })
  
    this.events.subscribe('userTap', pitch => {
    this.storage.ready().then(() => {
       
       storage.get('awayTeam'+ccc).then(teamval => {
       let batter = {};
     	storage.get(teamval).then(teamobj => {
     	

       let situation = [0,0,0,0,[0,0,0]];
	       this.storage.get('situation'+ccc).then((val) => {
	       situation = val;
		       let i =0;
	     	for (i=0;i<teamobj.batters.length;i++){
	     	var batterP;
	     	batterP = situation[3];
	     	
	     	if (teamobj.batters[i].order==batterP%9+1){
	       batter = teamobj.batters[i];

	       }
	       }
	       let linescore = [[0],[0],[0],[0]];
	       	   this.storage.get('linescore'+ccc).then((val) => {
	       	   linescore = val;
	       	   let currentSequence = [];
	       	   	   this.storage.get('currentSequence'+ccc).then((val) => {
	       	       let csequence = val;
	       	       csequence.push([Math.floor((pitch[0]-pitch[2])*100./pitch[4]),Math.floor((pitch[1]-pitch[3])*100./pitch[4]),pitch[5],pitch[6]]);
			       this.storage.set('currentSequence'+ccc,csequence); currentSequence = csequence;

			       let theresult = determinePlay(this.events,pitch,batter,situation,linescore,ccc,[situation[0],situation[1]],csequence,storage);

			       this.storage.set('situation'+ccc,theresult[0]);
			       this.storage.set('linescore'+ccc,theresult[1]);
			       if (ccc=='save'){getSave(linescore,this.storage);}
			       if (situation[0]==0 && situation[1]==0){
			       		this.storage.set('currentSequence'+ccc, []); currentSequence = [];
			       }
			       this.events.publish('centralSequence', currentSequence);
			       })
		       })
	       })
       })
       })
     });
    });
    })
  })


  }
  ngAfterViewInit(){ 
  }
  gameOver(whereTo){this.events.publish('gameOver',whereTo);}

}

function determinePlay(myevent,pitch,batter,situation,linescore,gtype,count,csequence,storage){
	let situationhold = situation;
	document.getElementById('lastpitch').innerHTML = '';
	document.getElementById('lastresult').innerHTML = '';
	let touchx = (pitch[0]-pitch[2])*100./pitch[4];
	let touchy = (pitch[1]-pitch[3])*100./pitch[4];


	let isStrike = makeCall(touchx,touchy);
	let moveDelta = movePitch(csequence);
    let isSwing = makeSwing(moveDelta[0],moveDelta[1],batter.swingMap,count);
    if (isSwing=='Swing'){
        let isContact = makeContact(touchx,touchy,batter.contactMap,batter.inplayMap,batter.bats,pitch[7],[pitch[5],pitch[6]]);
        if (isContact=='Fair'){
        	if (gtype=='27'){console.log('You Lose.'); myevent.publish('central27','loss');}
        	else{


            let isPlay = makePlay(touchx,touchy,batter.singleMap,batter.doubleMap,batter.tripleMap,batter.hrMap,batter.contact,batter.power);
            if (isPlay=='Out'){situation[0] = 0; situation[1]=0; document.getElementById('lastpitch').innerHTML = 'Out'; 
            if (situation[2]==2) {situation[2]=0; situation[4]=[0,0,0]; document.getElementById('lastpitch').innerHTML = 'Inning Over';
	            if (linescore[0].length<9){
	            linescore[0].push(0); linescore[1].push(Math.floor(Math.random()*2));
	            }
	            else {
	            let i = 0;
	            let awayruns = linescore[0][linescore[0].length-1];
	            let homeruns = 0;
	            for (i=0;i<linescore[0].length-1;i++){
	            awayruns+=linescore[0][i];
	            homeruns+=linescore[1][i];
	            }
	            if (homeruns>awayruns){
	            	console.log('Game Over. You Win.');
	            	getSave(linescore,storage,'Save');
	            }
	            else{
	            if (homeruns==awayruns) {getSave(linescore,storage,'Tie');}
	            linescore[1].push(Math.floor(Math.random()*2));
	            if (awayruns>homeruns+linescore[1][linescore[1].length-1]){
	            console.log('Game Over. You Lose.');
	            }
	            else if (awayruns<homeruns+linescore[1][linescore[1].length-1]){
	            console.log('Game Over. You Win.');
	            }
	            else {
	            console.log('Extra Innings!');
	            linescore[0].push(0);
	            }
	            }
	            }
            } else {situation[2]++;}}
            else { linescore = linescoreChange(isPlay,situationhold,linescore,gtype); situation = situationChange(isPlay, situation);}
            situation[3]++;
            }
        }
        else if (isContact=='Foul'){document.getElementById('lastpitch').innerHTML = 'Foul Ball'; if (situation[1]<2) {situation[1]++;}}
        else {let theresult= noContact('Strike',situation,linescore,myevent,gtype,storage); situation= theresult[0]; linescore = theresult[1];}
    }
    else{
    	let theresult= noContact(isStrike,situation,linescore,myevent,gtype,storage); situation= theresult[0];
    	linescore = theresult[1];
    	
    	
    }
    myevent.publish('centralTap', situation);
    
    myevent.publish('centralScore', linescore);
    myevent.publish('centralBatter',situation[3]%9+1)
    return [situation,linescore];
    
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
    theSwing = 'Swing';
    }

    return theSwing;
 }

 function makeContact(tx,ty,contactMap,inplayMap,bats,velocity,movement){
 	if (bats=='R'){
 	contactMap[0]=60;
 	}
 	else{
 	contactMap[0]=40;
 	}
    let theContact = 'Miss';
    let percentContact = swingPercentage(contactMap,tx,ty)*adjContact('Contact',velocity,movement);
    if (Math.random()<percentContact){
    	let percentFair = swingPercentage(inplayMap,tx,ty)*adjContact('Fair',velocity,movement);
    	if (Math.random()<percentFair){
    		theContact = 'Fair';
    	}
    	else{
    		theContact = 'Foul';
    	}
    
    }

    return theContact;
 }

  function makePlay(tx,ty,SingleMap,DoubleMap,TripleMap,hrMap,contact,power){
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

 function noContact(isStrike, situation, linescore,myevent,gtype,storage){
	if (situation[0]==3 && isStrike=='Ball'){
		situation[0]=0;
		situation[1]=0;
		if (situation[4][2]==0){situation[4][2]=1;}
		else if (situation[4][1]==0){situation[4][1]=1;}
		else if (situation[4][0]==0){situation[4][0]=1;}
		else {linescore = linescoreChange('Walk',situation,linescore,gtype);}
		document.getElementById('lastpitch').innerHTML = 'Walk';
		if (gtype=='27'){myevent.publish('central27','loss');}
		situation[3]++;
	}
	else if (situation[1]==2 && isStrike=='Strike'){
		situation[0]=0;
		situation[1]=0;
		if (situation[2]==2){
		situation[2]=0;
				if (linescore[0].length<9){
	            linescore[0].push(0); linescore[1].push(Math.floor(Math.random()*2));
	            }
	            else {
	            let i = 0;
	            let awayruns = linescore[0][linescore[0].length-1];
	            let homeruns = 0;
	            for (i=0;i<linescore[0].length-1;i++){
	            awayruns+=linescore[0][i];
	            homeruns+=linescore[1][i];
	            }
	            if (homeruns>awayruns){
	            	console.log('Game Over. You Win.');
	            	getSave(linescore,storage,'Save');
	            }
	            else{
	            if (homeruns==awayruns) {getSave(linescore,storage,'Tie');}
	            linescore[1].push(Math.floor(Math.random()*2));
	            if (awayruns>homeruns+linescore[1][linescore[1].length-1]){
	            console.log('Game Over. You Lose.');
	            }
	            else if (awayruns<homeruns+linescore[1][linescore[1].length-1]){
	            console.log('Game Over. You Win.');
	            }
	            else {
	            console.log('Extra Innings!');
	            linescore[0].push(0);
	            }
	            }
	            }
		situation[4]=[0,0,0];
		document.getElementById('lastresult').innerHTML = 'Inning Over';
		}
		else {
		situation[2]++;
		}
		document.getElementById('lastpitch').innerHTML = 'Strikeout!';
		if (gtype=='27'){myevent.publish('central27','k');}
		situation[3]++;
	}
	else if (isStrike=='Strike') {
		situation[1]++;
		document.getElementById('lastpitch').innerHTML = 'Strike '.concat(situation[1].toString());
	}
	else{
		situation[0]++;
		document.getElementById('lastpitch').innerHTML = 'Ball '.concat(situation[0].toString());
	}

	return [situation, linescore];

 }

 function situationChange(isPlay, situation){
 	situation[0]=0;
 	situation[1]=0;
	if (isPlay=='Single'){
		situation[4].shift();
		situation[4].push(1);

	}
	else if (isPlay=='Double'){
		situation[4].shift();
		situation[4].shift();
		situation[4].push(1);
		situation[4].push(0);
	}
	else if (isPlay=='Triple'){
		situation[4] = [1,0,0];
	}
	else {situation[4] = [0,0,0];}
	document.getElementById('lastpitch').innerHTML = isPlay;
	return situation;

 }

 function linescoreChange(isPlay, situation, linescore,gtype){
 	if (isPlay=='Single'){
 		linescore[2][1]++;
		if (situation[4][0]==1){linescore[0][linescore[0].length-1]++; document.getElementById('lastresult').innerHTML = '1 Run Scores';}
		
	}
	else if (isPlay=='Double'){
	linescore[2][1]++;
		if (situation[4][0]==1){linescore[0][linescore[0].length-1]++;}
		if (situation[4][1]==1){linescore[0][linescore[0].length-1]++;}
		if (situation[4][0]+situation[4][1]==2){document.getElementById('lastresult').innerHTML = '2 Runs Score';}
		else if (situation[4][0]+situation[4][1]==1){document.getElementById('lastresult').innerHTML = '1 Run Scores';}
		
	}
	else if (isPlay=='Triple'){
	linescore[2][1]++;
		if (situation[4][0]==1){linescore[0][linescore[0].length-1]++;}
		if (situation[4][1]==1){linescore[0][linescore[0].length-1]++;}
		if (situation[4][2]==1){linescore[0][linescore[0].length-1]++;}
		if (situation[4][0]+situation[4][1]+situation[4][2]>1){document.getElementById('lastresult').innerHTML = (situation[4][0]+situation[4][1]+situation[4][2]).toString().concat(' Runs Score');}
		else if (situation[4][0]+situation[4][1]+situation[4][2]==1){document.getElementById('lastresult').innerHTML = '1 Run Scores';}
	}
	else if (isPlay=='Home Run'){
	linescore[2][1]++;
	if (situation[4][0]==1){linescore[0][linescore[0].length-1]++;}
	if (situation[4][1]==1){linescore[0][linescore[0].length-1]++;}
	if (situation[4][2]==1){linescore[0][linescore[0].length-1]++;}
	linescore[0][linescore[0].length-1]++;
	if (situation[4][0]+situation[4][1]+situation[4][2]>0){document.getElementById('lastresult').innerHTML = (1+situation[4][0]+situation[4][1]+situation[4][2]).toString().concat(' Runs Score');}
		else {document.getElementById('lastresult').innerHTML = '1 Run Scores';}
	}
	else{
	 linescore[0][linescore[0].length-1]++; document.getElementById('lastresult').innerHTML = '1 Run Scores';
	}
	
	return linescore;

 }

function swingPercentage([maxLocationx,maxLocationy,maxValuex,maxValuey,minValuex,minValuey],xL,yL){
   let spx = (minValuex-maxValuex)/(100)**2*(xL-maxLocationx)**2+maxValuex;
   let spy = (minValuey-maxValuey)/(100)**2*(yL-maxLocationy)**2+maxValuey;
   let swingPercentage = Math.max(spx,0)*Math.max(spy,0);
   return swingPercentage;
}

function movePitch(csequence){
	let i = 0;
	let totx = 0;
	let toty = 0;
	let csl =csequence.length-1;
	for (i=0;i<csl;i++){
		totx = totx+csequence[i][2];
		toty = toty+csequence[i][3];
	}
	let avgx = totx/(csl);
	let avgy = toty/(csl);
	let xInit = csequence[csl][0]-csequence[csl][2];
	let yInit = csequence[csl][1]-csequence[csl][3];

	return [xInit+(avgx+csequence[csl][2])/2,yInit+(avgy+csequence[csl][3])/2];
}


function adjContact(play,velocity,movement){
	if (play=='Contact'){return 1;}
	if (play=='Fair'){return 1;}
}

function getSave(linescore,storage,outcome='No'){
	if (linescore[2][0]>linescore[3][0]){
		console.log('Blown Save to Record');
		document.getElementById('goback').style.display = 'block';


	}
	else if (outcome=='Save'){
		console.log('Save');
		storage.ready().then(() => {
		storage.get('saveId').then(val => {
		storage.get('save').then(saveval => {
		console.log(saveval);
		let saveArr = [['false','false','false','false'],['false','false','false','false'],['false','false','false','false']];
		if (saveval != null){
		saveArr = saveval;
		}
		saveArr[val][0]='true';
		saveArr[val][1]='true';
		saveArr[val][2]='true';
		saveArr[val][3]='true';
		storage.set('save',saveArr);
		})
		})
		
		})
		document.getElementById('goback').style.display = 'block';
	}
	else if (outcome=='Tie'){
		console.log('Save');
		storage.ready().then(() => {
		storage.get('saveId').then(val => {
		storage.get('save').then(saveval => {
		let saveArr = [['false','false','false','false'],['false','false','false','false'],['false','false','false','false']];
		if (saveval != null){
		saveArr = saveval;
		}
		saveArr[val][0]='true';
		storage.set('save',saveArr);
		})
		})
		
		})
		document.getElementById('goback').style.display = 'block';
	}

}