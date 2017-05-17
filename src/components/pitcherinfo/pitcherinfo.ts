import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PitcherinfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pitcherinfo',
  templateUrl: 'pitcherinfo.html'
})
export class PitcherinfoComponent {

  private Velocity = 5;
  private Movement = 50;
  p1Velocity: number = 90;
  p2Velocity: number = 90;
  p3Velocity: number = 90;
  p4Velocity: number = 90;
  p5Velocity: number = 90;
  pitch1Velocity: number = 80;
  pitch2Velocity: number = 80;
  pitch3Velocity: number = 80;
  pitch4Velocity: number = 80;
  pitch5Velocity: number = 80;
  modsum: number = 0;
  hdist1: number = 0;
  vdist1: number = 0;
  hdist2: number = 0;
  vdist2: number = 0;
  hdist3: number = 0;
  vdist3: number = 0;
  hdist4: number = 0;
  vdist4: number = 0;
  hdist5: number = 0;
  vdist5: number = 0;
  p: number = 1009;
  q: number = 1013;
  r: number = 1019;

  constructor(public storage: Storage) {
    console.log('Hello PitcherinfoComponent Component');
	storage.ready().then(() => {
       storage.get('currentPitcher').then((val) => {
       
       this.pitch1Velocity = val.pitch1.velocity;
       this.pitch2Velocity = val.pitch2.velocity;
       this.pitch3Velocity = val.pitch3.velocity;
       this.pitch4Velocity = val.pitch4.velocity;
       this.pitch5Velocity = val.pitch5.velocity;
       this.hdist1 = val.pitch1.movement[0];
       this.vdist1 = val.pitch1.movement[1];
       this.hdist2 = val.pitch2.movement[0];
       this.vdist2 = val.pitch2.movement[1];
       this.hdist3 = val.pitch3.movement[0];
       this.vdist3 = val.pitch3.movement[1];
       this.hdist4 = val.pitch4.movement[0];
       this.vdist4 = val.pitch4.movement[1];
       this.hdist5 = val.pitch5.movement[0];
       this.vdist5 = val.pitch5.movement[1];
       this.p1Velocity = this.pitch1Velocity+this.Velocity;
       this.p2Velocity = this.pitch2Velocity+this.Velocity;
       this.p3Velocity = this.pitch3Velocity+this.Velocity;
       this.p4Velocity = this.pitch4Velocity+this.Velocity;
       this.p5Velocity = this.pitch5Velocity+this.Velocity;

       let myelement = document.getElementById('scoreboard');
	  let physicalScreenW = myelement.getBoundingClientRect().width;
	  
	  let i = 0;

	  let hdist = [this.hdist1,this.hdist2,this.hdist3,this.hdist4,this.hdist5];
	  let vdist = [this.vdist1,this.vdist2,this.vdist3,this.vdist4,this.vdist5];

	  for (i=1;i<6;i++){
	  var c = <HTMLCanvasElement> document.getElementById("pitch".concat(i.toString()));
	  c.width= physicalScreenW*.19;
	  c.height= physicalScreenW*.19;
	  let multiplier = 1.25/600.*(physicalScreenW*.7-10)*(this.Movement+100.)/150.;
	  var ctx = c.getContext('2d');
	  let midpoint = physicalScreenW*.095;
	  canvas_arrow(ctx,midpoint-hdist[i-1]*multiplier,midpoint-vdist[i-1]*multiplier,midpoint+hdist[i-1]*multiplier,midpoint+vdist[i-1]*multiplier);
	  }

       })
     });
  }

  throw(pitch) {

  if (pitch==1){this.modsum = this.p*this.q*Math.floor(this.hdist1*(this.Movement+100.)/150.)+this.p*this.r*this.Velocity+this.q*this.r*Math.floor(this.vdist1*(this.Movement+100.)/150.);}
  else if (pitch==2){this.modsum = this.p*this.q*Math.floor(this.hdist2*(this.Movement+100.)/150.)+this.p*this.r*this.Velocity+this.q*this.r*Math.floor(this.vdist2*(this.Movement+100.)/150.);}
  else if (pitch==3){this.modsum = this.p*this.q*Math.floor(this.hdist3*(this.Movement+100.)/150.)+this.p*this.r*this.Velocity+this.q*this.r*Math.floor(this.vdist3*(this.Movement+100.)/150.);}
  else if (pitch==4){this.modsum = this.p*this.q*Math.floor(this.hdist4*(this.Movement+100.)/150.)+this.p*this.r*this.Velocity+this.q*this.r*Math.floor(this.vdist4*(this.Movement+100.)/150.);}
  else if (pitch==5){this.modsum = this.p*this.q*Math.floor(this.hdist5*(this.Movement+100.)/150.)+this.p*this.r*this.Velocity+this.q*this.r*Math.floor(this.vdist5*(this.Movement+100.)/150.);}
  let element = document.getElementById('pitchinfo');
  element.innerHTML = this.modsum.toString();
  
  }

  ngAfterViewInit(){ 
  let myelement = document.getElementById('scoreboard');
  let physicalScreenW = myelement.getBoundingClientRect().width; 
  document.getElementById('velocitySlider').style.width = (physicalScreenW*.25).toString().concat('px');
	  document.getElementById('movementSlider').style.width = (physicalScreenW*.25).toString().concat('px');
  
  }

  updateSlider(){
  this.p1Velocity = this.pitch1Velocity+this.Velocity;
       this.p2Velocity = this.pitch2Velocity+this.Velocity;
       this.p3Velocity = this.pitch3Velocity+this.Velocity;
       this.p4Velocity = this.pitch4Velocity+this.Velocity;
       this.p5Velocity = this.pitch5Velocity+this.Velocity;


  let myelement = document.getElementById('scoreboard');
  let physicalScreenW = myelement.getBoundingClientRect().width;
  let i = 0;
  let hdist = [this.hdist1,this.hdist2,this.hdist3,this.hdist4,this.hdist5];
  let vdist = [this.vdist1,this.vdist2,this.vdist3,this.vdist4,this.vdist5];

  for (i=1;i<6;i++){
  var c = <HTMLCanvasElement> document.getElementById("pitch".concat(i.toString()));
  c.width= physicalScreenW*.19;
  c.height= physicalScreenW*.19;
  let multiplier = 1.25/600.*(physicalScreenW*.7-10)*(this.Movement+100.)/150.;
  var ctx = c.getContext('2d');
  let midpoint = physicalScreenW*.095;
  canvas_arrow(ctx,midpoint-hdist[i-1]*multiplier,midpoint-vdist[i-1]*multiplier,midpoint+hdist[i-1]*multiplier,midpoint+vdist[i-1]*multiplier);
  }



  }




}

function canvas_arrow(context, fromx, fromy, tox, toy){
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}


