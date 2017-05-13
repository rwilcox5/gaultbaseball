import { Component } from '@angular/core';

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
  modsum: number = 0;
  p: number = 1009;
  q: number = 1013;
  r: number = 1019;

  constructor() {
    console.log('Hello PitcherinfoComponent Component');
  }

  throw(pitch) {
  this.modsum = this.p*this.q*pitch+this.p*this.r*this.Velocity+this.q*this.r*this.Movement;
  let element = document.getElementById('pitchinfo');
  element.innerHTML = this.modsum.toString();
  console.log(element.innerHTML);
  console.log((this.modsum*757*101)%1009);
  console.log((this.modsum*253*169)%1013);
  console.log((this.modsum*917*849)%1019);
  }

  ngAfterViewInit(){  
  let myelement = document.getElementById('scoreboard');
  let physicalScreenW = myelement.getBoundingClientRect().width;
  let i = 0;
  let hdist = [20,-20,-40,-30,-5];
  let vdist = [5,50,20,30,-5];

  for (i=1;i<6;i++){
  var c = <HTMLCanvasElement> document.getElementById("pitch".concat(i.toString()));
  c.width= physicalScreenW*.19;
  c.height= physicalScreenW*.19;
  let multiplier = 1.25/600.*(physicalScreenW*.7-10);
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


