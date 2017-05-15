import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the StrikezoneComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'strikezone',
  templateUrl: 'strikezone.html'
})



export class StrikezoneComponent {
  @ViewChild('strikezoneCanvas') strikezoneCanvas;

  constructor(public events: Events) {


  }


	ngAfterViewInit(){  
        let myelement = document.getElementById('scoreboard');
        let physicalScreenW = myelement.getBoundingClientRect().width;
        this.strikezoneCanvas.nativeElement.width = physicalScreenW*.7-10;
        this.strikezoneCanvas.nativeElement.height = physicalScreenW*.7-10;
        let szsize = 125./300.*(physicalScreenW*.7-10);
        let last10 = [[1,0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0]]
        drawZone(this.strikezoneCanvas.nativeElement.getContext('2d'),szsize,10,10,this.strikezoneCanvas.nativeElement.width,this.strikezoneCanvas.nativeElement.height,true,0,last10);
    }

    onTap(event){
    stopZone(event.srcEvent.offsetX,event.srcEvent.offsetY);
    myevent = this.events;
    }




}
var myevent;
var thecall = 'ball';
var theSwing = 'take';
var theContact = 'miss';
var thePlay = 'out';
var stopanimate = false;
var startanimate = false;
var touchx = 0;
var touchy = 0;
var pitchvelocity = 1;
var lastframe = 0;
var ntimes = 0;

function stopZone(tx,ty){
	stopanimate = true;
	touchx = tx;
	touchy = ty;
}

function update(leftx,topy,pitchvelocity,maxx,maxy,szsize,last10){
    if (leftx+pitchvelocity < maxx-szsize-10){
        if (leftx-pitchvelocity > 10){
            let randx = Math.random();
            if (randx < 1./(1.+10.**((leftx-88.)/270.))+last10[0].reduce(function (a, b) {  return a + b;}, 0)/10.-.5){
                leftx=leftx+pitchvelocity;
            }
            else{
                leftx=leftx-pitchvelocity;
            }
        }
        else{
            leftx=leftx+pitchvelocity;
        }
    }
    else{
        leftx=leftx-pitchvelocity;
    }

    if (topy+pitchvelocity < maxy-szsize-10){
        if (topy-pitchvelocity > 10){
            let randx = Math.random();
            if (randx < 1./(1.+10.**((topy-88.)/270.))+last10[1].reduce(function (a, b) {  return a + b;}, 0)/10.-.5){
                topy=topy+pitchvelocity;
            }
            else{
                topy=topy-pitchvelocity;
            }
        }
        else{
            topy=topy+pitchvelocity;
        }
    }
    else{
        topy=topy-pitchvelocity;
    }
    return [leftx, topy];
}
function drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,clearit,timestamp,last10){
	let element = document.getElementById('pitchinfo');
	let pitchstring = element.innerText || element.textContent;
	if (pitchstring != 'NOTHING'){
	startanimate = true;
    let pitchn = parseInt(pitchstring);
    let rawvelocity = (pitchn*253*169)%1013;
    let delta = 0;
    if (timestamp>lastframe){
        delta = Math.min((timestamp-lastframe)/16.,5);
        lastframe=timestamp;
    }
    let rawtimes = delta*(rawvelocity+10.)/5.;
    let ftimes = Math.floor(rawtimes);
    if (Math.random()<rawtimes-ftimes){
        ntimes = ftimes+1;
    }
    else{
        ntimes = ftimes;
    }
    pitchvelocity = 1;
	}
    let ctx = strikezoneCanvas;
    if (clearit) {
    ctx.clearRect(0, 0, maxx,maxy);

    }
    
    ctx.beginPath();

    ctx.moveTo(leftx, topy);
    ctx.lineTo(leftx,topy+szsize);
    ctx.lineTo(leftx+szsize,topy+szsize);
    ctx.lineTo(leftx+szsize,topy);
    ctx.lineTo(leftx,topy);
    ctx.stroke();
    ctx.closePath();
    
    if (!stopanimate){

    if (startanimate) {
    let i = 0;
    for (i=0;i<ntimes;i++){
    let lastleftx = leftx;
    let lasttopy = topy;
    let locat = update(leftx,topy,pitchvelocity,maxx,maxy,szsize,last10);
    leftx = locat[0];
    topy =locat[1];
    last10[0].shift();
    if (leftx>lastleftx){
    last10[0].push(1);
    }
    else{
    last10[0].push(0);
    }
    last10[1].shift();
    if (topy>lasttopy){
    last10[1].push(1);
    }
    else{
    last10[1].push(0);
    }
    }
    }

    requestAnimationFrame(function(timestamp) {drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,startanimate,timestamp,last10)});
    }

    else{
    ctx.clearRect(0, 0, maxx,maxy);
    ctx.clearRect(0, 0, maxx,maxy);
    ctx.beginPath();

    ctx.moveTo(leftx, topy);
    ctx.lineTo(leftx,topy+szsize);
    ctx.lineTo(leftx+szsize,topy+szsize);
    ctx.lineTo(leftx+szsize,topy);
    ctx.lineTo(leftx,topy);
    ctx.stroke();
    ctx.closePath();

    
    ctx.fillStyle="#EEEEEE";
    ctx.beginPath();
	ctx.arc(touchx,touchy,10,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

    let isStrike = makeCall(touchx,touchy, leftx, topy,szsize);
    let isSwing = makeSwing(touchx,touchy, leftx, topy,szsize);
    if (isSwing=='swing'){
        let isContact = makeContact(touchx,touchy, leftx, topy,szsize);
        if (isContact=='fair'){
            let isPlay = makePlay(touchx,touchy, leftx, topy,szsize);
        }
    }

	stopanimate = false;
	startanimate = false;
    let element = document.getElementById('pitchinfo');
    element.innerHTML = 'NOTHING';
    requestAnimationFrame(function(timestamp) {drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,false,timestamp,last10)});
    }
    

 }

function makeCall(tx,ty,zx,zy,szsize){
    thecall = 'ball';
    if (tx>zx){
        if (tx<zx+szsize){
            if (ty>zy){
                if (ty<zy+szsize){
                    thecall = 'strike';
                    
                }
}}}

    myevent.publish('userTap', thecall);
    console.log(thecall);
    return thecall;

 }

 function makeSwing(tx,ty,zx,zy,szsize){
    theSwing = 'take';
    if (tx>zx){
        if (tx<zx+szsize){
            if (ty>zy){
                if (ty<zy+szsize){
    let midpointx = szsize/2+zx;
    let midpointy = szsize/2+zy;
    let midpointDist = Math.sqrt((tx-midpointx)**2+(ty-midpointy)**2);
    let szDist = Math.min(tx-zx,ty-zy);
    let percentSwing = szDist/(szDist+midpointDist);
    if (Math.random()<percentSwing){
    theSwing = 'swing';
    }
    }
    }
    }
    }
    console.log(theSwing);
    return theSwing;
 }

 function makeContact(tx,ty,zx,zy,szsize){
    theContact = 'miss';
    let midpointx = szsize/2+zx;
    let midpointy = szsize/2+zy;
    let midpointDist = Math.sqrt((tx-midpointx)**2+(ty-midpointy)**2);
    let szDist = Math.min(tx-zx,ty-zy);
    let percentFair = szDist/(szDist+midpointDist)/3+.2;
    let percentFoul = szDist/(szDist+midpointDist)/3+.2;
    if (Math.random()<percentFair){
    theContact = 'fair';
    }
    else if (Math.random()<percentFoul){
    theContact = 'foul';
    }
    console.log(theContact);
    return theContact;
 }

  function makePlay(tx,ty,zx,zy,szsize){
    theContact = 'out';
    let midpointx = szsize/2+zx;
    let midpointy = szsize/2+zy;
    let midpointDist = Math.sqrt((tx-midpointx)**2+(ty-midpointy)**2);
    let szDist = Math.min(tx-zx,ty-zy);
    let percent1b = szDist/(szDist+midpointDist)/3+.2;
    let percent2b = szDist/(szDist+midpointDist)/4+.1;
    let percent3b = szDist/(szDist+midpointDist)/6;
    let percenthr = szDist/(szDist+midpointDist)/3+.2;
    if (Math.random()<percent1b){
    thePlay = 'single';
    }
    else if (Math.random()<percent2b){
    thePlay = 'double';
    }
    else if (Math.random()<percent3b){
    thePlay = 'triple';
    }
    else if (Math.random()<percenthr){
    thePlay = 'homer';
    }
    console.log(thePlay);
    return thePlay;
 }

