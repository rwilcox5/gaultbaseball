import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SituationDiceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'situation-dice',
  templateUrl: 'situation-dice.html'
})
export class SituationDiceComponent {
@ViewChild('basesCanvas') basesCanvas;


  balls:number = 0;
  strikes: number = 0;
  outcomes: Array<string>;
  results: Array<string> = [];
  place = '13';
  pla: Array<boolean>= [true,true,true,true,true,true,false,true,true,true,true,true,true,true];

  

  constructor(public events: Events, storage: Storage) {
  this.outcomes = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    storage.ready().then(() => {
    storage.get('gametype').then(gtval => {
       storage.get('situation'+gtval).then((val) => {

       this.balls = val[0];
	   this.strikes = val[1];

       })
       })
     });
    console.log('Hello SituationComponent Component');

    this.events.subscribe('centralTap', call => {
    this.balls = call[0];
    this.strikes = call[1];
    });
    this.events.subscribe('abResult', result => {

    if (result=='Strikeout'){this.results.push('K');}
    if (result=='Out'){this.results.push('O');}
    if (result=='Walk'){this.results.push('BB');}
    if (result=='Single'){this.results.push('1B');}
    if (result=='Double'){this.results.push('2B');}
    if (result=='Triple'){this.results.push('3B');}
    if (result=='Home Run'){this.results.push('HR');}
    
    if (this.results.length==1){   	this.outcomes[4]=this.results[0]; this.outcomes[0]=''; this.outcomes[8]=''; this.outcomes[6]=''; this.outcomes[2]='';   }
    if (this.results.length==2){   	this.outcomes[0]=this.results[0]; this.outcomes[8]=this.results[1]; this.outcomes[4]='';    }
    if (this.results.length==3){   	this.outcomes[0]=this.results[0]; this.outcomes[8]=this.results[1]; this.outcomes[4]=this.results[2];   }
    if (this.results.length==4){   	this.outcomes[0]=this.results[0]; this.outcomes[8]=this.results[1]; this.outcomes[6]=this.results[2]; this.outcomes[2]=this.results[3]; this.outcomes[4]='';    }
    if (this.results.length==5){   	this.outcomes[0]=this.results[0]; this.outcomes[8]=this.results[1]; this.outcomes[6]=this.results[2]; this.outcomes[2]=this.results[3]; this.outcomes[4]=this.results[4]; 
    let i = 13;
    let maxV = 0;
    let maxI = 0;
    for (i=13;i>=0;i--){if (getValue(i,this.results)>maxV && this.pla[i]) {maxI=i; maxV=getValue(i,this.results);}}
    this.place = maxI.toString();

      }
    });

  }
  ngAfterViewInit(){  


  }

  onChoose(){
	let index = parseInt(this.place);
	let value = getValue(index, this.results);
  this.events.publish('updateDice',[index,value.toString()]);
  	this.results = [];
  	this.pla[index]=false;
  	let iplace = 13;
  	for (iplace=0;iplace<14;iplace++){
  	if (this.pla[iplace]) {this.place = iplace.toString();}
  	}
  
  }
  fake(n){
  let abRes = 'Strikeout';
  if (n==0){abRes='Home Run';}
  if (n==1){abRes='Triple';}
  if (n==2){abRes='Double';}
  if (n==3){abRes='Single';}
  if (n==4){abRes='Walk';}
  if (n==5){abRes='Out';}
  this.events.publish('abResult',abRes);
  }

}

function getValue(index,results){
	
  let value = 0;
  console.log('trl='+results.length.toString());
  if (results.length==5){
  	let nEvents = [0,0,0,0,0,0,0];
  	console.log('value='+value.toString());
  	let i = 0;
  	for (i=0;i<5;i++){
  	if (results[i]=='K'){nEvents[5]++;}
  	if (results[i]=='O'){nEvents[4]++;}
  	if (results[i]=='BB'){nEvents[3]++;}
  	if (results[i]=='1B'){nEvents[2]++;}
  	if (results[i]=='2B'){nEvents[1]++;}
  	if (results[i]=='3B'){nEvents[6]++;}
  	if (results[i]=='HR'){nEvents[0]++;}
  	}

  	console.log('value='+value.toString());
  	if (index==0){value=(nEvents[0]+nEvents[6])*1;}
  	if (index==1){value=(nEvents[1]+nEvents[6])*2;}
  	if (index==2){value=(nEvents[2]+nEvents[6])*3;}
  	if (index==3){value=(nEvents[3]+nEvents[6])*4;}
  	if (index==4){value=(nEvents[4]+nEvents[6])*5;}
  	if (index==5){value=(nEvents[5]+nEvents[6])*6;}
  	if (index==7){if (isFull(nEvents)){value=25;}}
  	if (index==8){value = isKind(nEvents,3);}
  	if (index==9){value = isKind(nEvents,4);}
  	if (index==10){value = isRow(nEvents,4);}
  	if (index==11){value = isRow(nEvents,5);}
  	if (index==12){value = isKind(nEvents,5);}
  	if (index==13){value = isKind(nEvents,0);}
  	console.log('value='+value.toString());

  	return value;
  }
}
function isRow(nEvents,nMin){
let i =0;
	if (nMin==4){
		if (nEvents[0]==0){
		if (nEvents[1]==0){
		for (i=2;i<6;i++){
		if (nEvents[i]==0){
		if (nEvents[6]>0){
			nEvents[i]++;nEvents[6]--;
		}
		else{return 0;}
		}
		}
		return 30;
		}
		else{
		for (i=2;i<5;i++){
		if (nEvents[i]==0){
		if (nEvents[6]>0){
			nEvents[i]++;nEvents[6]--;
		}
		else{return 0;}
		}
		}
		return 30;
		}
		}
		else{
		let nDown = 0;
		for (i=1;i<4;i++){
		if (nEvents[i]==0){
		if (nEvents[6]>0){
			nEvents[i]++;nEvents[6]--;nDown++;
		}
		else{
			nEvents[6] += nDown;

			for (i=2;i<6;i++){
			if (nEvents[i]==0){
			if (nEvents[6]>0){
				nEvents[i]++;nEvents[6]--;
			}
			else{return 0;}
			}
			}
			return 30;

		}
		}
		}
		return 30;
		}
	}
	if (nMin==5){
		if (nEvents[0]==0){
		for (i=1;i<6;i++){
		if (nEvents[i]==0){
		if (nEvents[6]>0){
			nEvents[i]++;nEvents[6]--;
		}
		else{return 0;}
		}
		}
		return 40;
		}
		else{
		for (i=1;i<5;i++){
		if (nEvents[i]==0){
		if (nEvents[6]>0){
			nEvents[i]++;nEvents[6]--;
		}
		else{return 0;}
		}
		}
		return 40;
		}
	}

}


function isKind(nEvents,nMin){

	let maxType= 5;
	let isEnough = false;
	let i = 0;
	let rSum = 0;
	for (i=0;i<6;i++){
	if (nEvents[i]+nEvents[6]>=nMin){ isEnough = true; maxType = i; rSum += (i+1)*nEvents[i];}
	else { rSum += (i+1)*nEvents[i];}
	}
	if (nEvents[maxType]<nMin){
	if (nEvents[6]>0){nEvents[maxType]++; nEvents[6]--; rSum++; rSum += maxType;}
	}
	if (nEvents[maxType]<nMin){
	if (nEvents[6]>0){nEvents[maxType]++; nEvents[6]--; rSum++; rSum += maxType;}
	}
	if (nEvents[maxType]<nMin){
	if (nEvents[6]>0){nEvents[maxType]++; nEvents[6]--; rSum++; rSum += maxType;}
	}
	if (nEvents[maxType]<nMin){
	if (nEvents[6]>0){nEvents[maxType]++; nEvents[6]--; rSum++; rSum += maxType;}
	}
	for (i=0;i<nEvents[6];i++){
	rSum += 6;
	}

	console.log(maxType);
	if (isEnough){if (nMin<5) {return rSum;} else {return 50;}}
	else {return 0;}
}

function isFull(nEvents){
	let toptwo = [0,0];
	let i = 0;
	for (i=0;i<6;i++){
	if (nEvents[i]>toptwo[0]){toptwo[1]=toptwo[0]; toptwo[0]=nEvents[i];}
	else if (nEvents[i]>toptwo[1]){toptwo[1]=nEvents[i];}
	}
	if (toptwo[0]<3){
	if (nEvents[6]>0){toptwo[0]++; nEvents[6]--;}
	}
	if (toptwo[0]<3){
	if (nEvents[6]>0){toptwo[0]++; nEvents[6]--;}
	}
	if (toptwo[0]<3){
	if (nEvents[6]>0){toptwo[0]++; nEvents[6]--;}
	}
	if (toptwo[1]<2){
	if (nEvents[6]>0){toptwo[1]++; nEvents[6]--;}
	}
	if (toptwo[1]<2){
	if (nEvents[6]>0){toptwo[1]++; nEvents[6]--;}
	}
	console.log(toptwo);
	if (toptwo[0]==3 && toptwo[1]==2){return true;}
	else {return false;}
}



