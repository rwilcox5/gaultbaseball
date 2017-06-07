import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SituationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'situation',
  templateUrl: 'situation.html'
})
export class SituationComponent {

  count: string;
  balls:number = 0;
  strikes: number = 0;
  outsn: number = 0;
  outs: string;
  bases: string;
  

  constructor(public events: Events, storage: Storage) {
    storage.ready().then(() => {
    storage.get('gametype').then(gtval => {
       storage.get('situation'+gtval).then((val) => {

       this.balls = val[0];
	   this.strikes = val[1];
	   this.outsn=val[2];
	   this.count = this.balls.toString().concat('-').concat(this.strikes.toString());
	   this.outs = this.outsn.toString().concat(' Outs');
	   var c = <HTMLCanvasElement> document.getElementById("bases");
	   let i = 0;
	   for (i=1;i<4;i++){if (val[4][3-i]==1) {drawBase(c,i,'red',c.width);} else {drawBase(c,i,'white',c.width);}}


       })
       })
     });
    console.log('Hello SituationComponent Component');
    this.bases = 'bases';
    
    this.events.subscribe('centralTap', call => {
    this.balls = call[0];
    this.strikes = call[1];
    this.outsn=call[2];
    this.count = this.balls.toString().concat('-').concat(this.strikes.toString());
    this.outs = this.outsn.toString().concat(' Outs');
    var c = <HTMLCanvasElement> document.getElementById("bases");
	let i = 0;
	for (i=1;i<4;i++){if (call[4][3-i]==1) {drawBase(c,i,'red',c.width);} else {drawBase(c,i,'white',c.width);}}

    });
  }
  ngAfterViewInit(){  
  let myelement = document.getElementById('scoreboard');
  let physicalScreenW = myelement.getBoundingClientRect().width;
  var c = <HTMLCanvasElement> document.getElementById("bases");
  c.width= physicalScreenW*.15;
  c.height= physicalScreenW*.1;
  drawBase(c,1,'white',c.width);
  drawBase(c,2,'white',c.width);
  drawBase(c,3,'white',c.width);

  }

}

function drawBase(ctx,bn,bcolor,cwidth){
	var context = ctx.getContext('2d');
	var spoint;
	if (bn==1){
		spoint = [cwidth*.55,cwidth*.465];
	}
	else if (bn==2) {
		spoint = [cwidth*.3,cwidth*.215];
	}
	else {
		spoint = [cwidth*.05,cwidth*.465];
	}
	context.beginPath();
	context.moveTo(spoint[0],spoint[1]);
	context.lineTo(spoint[0]+cwidth*.20,spoint[1]-cwidth*.20);
	context.lineTo(spoint[0]+cwidth*.40,spoint[1]);
	context.lineTo(spoint[0]+cwidth*.20,spoint[1]+cwidth*.20);
	context.lineTo(spoint[0],spoint[1]);
	context.closePath();
	context.fillStyle = bcolor;
	context.fill();
	context.stroke();
}
