import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';

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
	@ViewChild('pitch1') pitch1;
	@ViewChild('pitch2') pitch2;
	@ViewChild('pitch3') pitch3;
	@ViewChild('pitch4') pitch4;
	@ViewChild('pitch5') pitch5;
	dice: boolean = true;



  private Velocity = 50;
  private Movement = 50;
  p1Velocity: string = '90 MPH';
  p2Velocity: string = '90 MPH';
  p3Velocity: string = '90 MPH';
  p4Velocity: string = '90 MPH';
  p5Velocity: string = '90 MPH';
  pitch1Velocity: number = 80;
  pitch2Velocity: number = 80;
  pitch3Velocity: number = 80;
  pitch4Velocity: number = 80;
  pitch5Velocity: number = 80;
  pitch1Control: number = 80;
  pitch2Control: number = 80;
  pitch3Control: number = 80;
  pitch4Control: number = 80;
  pitch5Control: number = 80;
  p1name: string = 'Fastball';
  p2name: string = 'Fastball';
  p3name: string = 'Fastball';
  p4name: string = 'Fastball';
  p5name: string = 'Fastball';
  p1Control: string = '80 Con';
  p2Control: string = '80 Con';
  p3Control: string = '80 Con';
  p4Control: string = '80 Con';
  p5Control: string = '80 Con';
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

  constructor(public events: Events) {
  this.events.subscribe('leaving', val => {
  this.events.unsubscribe('centralPitcher');
  })
    console.log('Hello PitcherinfoComponent Component');

       this.events.subscribe('centralPitcher', allVal => {
       let val = allVal[0];
       if (allVal[1]=='nobreaks'){this.dice = false;}

       let numPitches = val.numPitches;
       if (numPitches<2){ document.getElementById('pitch2').className += 'hiddenPitch'; document.getElementById('pitch2n').className += 'hiddenPitch'; document.getElementById('pitch2v').className += 'hiddenPitch'; document.getElementById('pitch2c').className += 'hiddenPitch';}
       if (numPitches<3){ document.getElementById('pitch3').className += 'hiddenPitch'; document.getElementById('pitch3n').className += 'hiddenPitch'; document.getElementById('pitch3v').className += 'hiddenPitch'; document.getElementById('pitch3c').className += 'hiddenPitch';}
       if (numPitches<4){ document.getElementById('pitch4').className += 'hiddenPitch'; document.getElementById('pitch4n').className += 'hiddenPitch'; document.getElementById('pitch4v').className += 'hiddenPitch'; document.getElementById('pitch4c').className += 'hiddenPitch';}
       if (numPitches<5){ document.getElementById('pitch5').className += 'hiddenPitch'; document.getElementById('pitch5n').className += 'hiddenPitch'; document.getElementById('pitch5v').className += 'hiddenPitch'; document.getElementById('pitch5c').className += 'hiddenPitch';}
       this.pitch1Velocity = val.pitch1.velocity;
       this.pitch2Velocity = val.pitch2.velocity;
       this.pitch3Velocity = val.pitch3.velocity;
       this.pitch4Velocity = val.pitch4.velocity;
       this.pitch5Velocity = val.pitch5.velocity;
       this.pitch1Control = val.pitch1.control;
       this.pitch2Control = val.pitch2.control;
       this.pitch3Control = val.pitch3.control;
       this.pitch4Control = val.pitch4.control;
       this.pitch5Control = val.pitch5.control;
       this.p1name= val.pitch1.name;
       this.p2name = val.pitch2.name;
       this.p3name = val.pitch3.name;
       this.p4name = val.pitch4.name;
       this.p5name = val.pitch5.name;
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
       this.p1Velocity = (this.pitch1Velocity+this.Velocity/10.).toString()+' MPH';
       this.p2Velocity = (this.pitch2Velocity+this.Velocity/10.).toString()+' MPH';
       this.p3Velocity = (this.pitch3Velocity+this.Velocity/10.).toString()+' MPH';
       this.p4Velocity = (this.pitch4Velocity+this.Velocity/10.).toString()+' MPH';
       this.p5Velocity = (this.pitch5Velocity+this.Velocity/10.).toString()+' MPH';
       this.p1Control = Math.max(Math.floor((this.pitch1Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p2Control = Math.max(Math.floor((this.pitch2Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p3Control = Math.max(Math.floor((this.pitch3Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p4Control = Math.max(Math.floor((this.pitch4Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p5Control = Math.max(Math.floor((this.pitch5Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';

	  let physicalScreenW = window.innerWidth;

	  let i = 0;

	  let hdist = [this.hdist1,this.hdist2,this.hdist3,this.hdist4,this.hdist5];
	  let vdist = [this.vdist1,this.vdist2,this.vdist3,this.vdist4,this.vdist5];

	  
	  let allcanvas = [this.pitch1.nativeElement,this.pitch2.nativeElement,this.pitch3.nativeElement,this.pitch4.nativeElement,this.pitch5.nativeElement];
	  for (i=1;i<6;i++){
	  let canvas = allcanvas[i-1];
	  canvas.width= physicalScreenW*.19;
	  canvas.height= physicalScreenW*.19;
	  let multiplier = 1.25/600.*(physicalScreenW*.67-10)*(this.Movement+100.)/150.;
	  let midpoint = physicalScreenW*.095;
	  canvas_arrow(canvas.getContext('2d'),midpoint-hdist[i-1]*multiplier,midpoint-vdist[i-1]*multiplier,midpoint+hdist[i-1]*multiplier,midpoint+vdist[i-1]*multiplier);

	  }

     });
  }

  throw(pitch) {
  if (pitch==1){
  let pitchinfo = {'hmove':Math.floor(this.hdist1*(this.Movement+100.)/150.),'vmove':Math.floor(this.vdist1*(this.Movement+100.)/150.),'rawControl':(100-Math.max(Math.floor((this.pitch1Control-this.Velocity*this.Movement/100.)),0)),'velocity':Math.floor(this.pitch1Velocity+this.Velocity/10.),'pitchstring':'Some'};
  this.events.publish('pitchinfo',pitchinfo);
  }
	if (pitch==2){
  let pitchinfo = {'hmove':Math.floor(this.hdist2*(this.Movement+100.)/150.),'vmove':Math.floor(this.vdist2*(this.Movement+100.)/150.),'rawControl':(100-Math.max(Math.floor((this.pitch2Control-this.Velocity*this.Movement/100.)),0)),'velocity':Math.floor(this.pitch2Velocity+this.Velocity/10.),'pitchstring':'Some'};
  this.events.publish('pitchinfo',pitchinfo);
  }
	if (pitch==3){
  let pitchinfo = {'hmove':Math.floor(this.hdist3*(this.Movement+100.)/150.),'vmove':Math.floor(this.vdist3*(this.Movement+100.)/150.),'rawControl':(100-Math.max(Math.floor((this.pitch3Control-this.Velocity*this.Movement/100.)),0)),'velocity':Math.floor(this.pitch3Velocity+this.Velocity/10.),'pitchstring':'Some'};
  this.events.publish('pitchinfo',pitchinfo);
  }
	if (pitch==4){
  let pitchinfo = {'hmove':Math.floor(this.hdist4*(this.Movement+100.)/150.),'vmove':Math.floor(this.vdist4*(this.Movement+100.)/150.),'rawControl':(100-Math.max(Math.floor((this.pitch4Control-this.Velocity*this.Movement/100.)),0)),'velocity':Math.floor(this.pitch4Velocity+this.Velocity/10.),'pitchstring':'Some'};
  this.events.publish('pitchinfo',pitchinfo);
  }
	if (pitch==5){
  let pitchinfo = {'hmove':Math.floor(this.hdist5*(this.Movement+100.)/150.),'vmove':Math.floor(this.vdist5*(this.Movement+100.)/150.),'rawControl':(100-Math.max(Math.floor((this.pitch5Control-this.Velocity*this.Movement/100.)),0)),'velocity':Math.floor(this.pitch5Velocity+this.Velocity/10.),'pitchstring':'Some'};
  this.events.publish('pitchinfo',pitchinfo);
  }


  
  }

  ngAfterViewInit(){ 

  let physicalScreenW = window.innerWidth; 


 
  }

  updateSlider(){
  	   this.p1Velocity = Math.floor(this.pitch1Velocity+this.Velocity/10.).toString()+' MPH';
       this.p2Velocity = Math.floor(this.pitch2Velocity+this.Velocity/10.).toString()+' MPH';
       this.p3Velocity = Math.floor(this.pitch3Velocity+this.Velocity/10.).toString()+' MPH';
       this.p4Velocity = Math.floor(this.pitch4Velocity+this.Velocity/10.).toString()+' MPH';
       this.p5Velocity = Math.floor(this.pitch5Velocity+this.Velocity/10.).toString()+' MPH';

       this.p1Control = Math.max(Math.floor((this.pitch1Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p2Control = Math.max(Math.floor((this.pitch2Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p3Control = Math.max(Math.floor((this.pitch3Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p4Control = Math.max(Math.floor((this.pitch4Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';
       this.p5Control = Math.max(Math.floor((this.pitch5Control-this.Velocity*this.Movement/100.)),0).toString()+' Con';


  let physicalScreenW = window.innerWidth;
  let i = 0;
  let hdist = [this.hdist1,this.hdist2,this.hdist3,this.hdist4,this.hdist5];
  let vdist = [this.vdist1,this.vdist2,this.vdist3,this.vdist4,this.vdist5];

  let allcanvas = [this.pitch1.nativeElement,this.pitch2.nativeElement,this.pitch3.nativeElement,this.pitch4.nativeElement,this.pitch5.nativeElement];
  for (i=1;i<6;i++){
  let canvas = allcanvas[i-1];
  canvas.width= physicalScreenW*.19;
  canvas.height= physicalScreenW*.19;
  let multiplier = 1.25/600.*(physicalScreenW*.67-10)*(this.Movement+100.)/150.;
  let midpoint = physicalScreenW*.095;
  canvas_arrow(canvas.getContext('2d'),midpoint-hdist[i-1]*multiplier,midpoint-vdist[i-1]*multiplier,midpoint+hdist[i-1]*multiplier,midpoint+vdist[i-1]*multiplier);

  }



  }




}

function canvas_arrow(context, fromx, fromy, tox, toy){
	console.log("fromx=");
	console.log(fromx);
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}


