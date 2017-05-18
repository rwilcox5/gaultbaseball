import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  constructor(public events: Events, storage: Storage) {
    
  storage.ready().then(() => {
       abh = [];
       abv = [];
       abhm = [];
       abvm = [];
       storage.get('currentSequence').then((val) => {
       let i = 0;
       for (i=0;i<val.length;i++){
           abh.push(val[i][0]);
           abv.push(val[i][1]);
           abhm.push(val[i][2]);
           abvm.push(val[i][3]);
       }
       })
       })

  this.events.subscribe('centralTap', val => {
    storage.ready().then(() => {
       abh = [];
       abv =[];
       abhm = [];
       abvm = [];
       storage.get('currentSequence').then((val) => {
       let i = 0;
       for (i=0;i<val.length;i++){
           abh.push(val[i][0]);
           abv.push(val[i][1]);
           abhm.push(val[i][2]);
           abvm.push(val[i][3]);
       }
       })
       })
  })
  }


	ngAfterViewInit(){  

        let canvas = this.strikezoneCanvas.nativeElement;
        canvas.addEventListener("mousedown", function (e) {
                stopZone(e.clientX-Math.floor(canvas.getBoundingClientRect().left)-1,e.clientY-Math.floor(canvas.getBoundingClientRect().top)-1);

        }, false);
        let myelement = document.getElementById('scoreboard');
        let physicalScreenW = myelement.getBoundingClientRect().width;
        this.strikezoneCanvas.nativeElement.width = physicalScreenW*.67-10;
        this.strikezoneCanvas.nativeElement.height = physicalScreenW*.67-10;
        let szsize = 125./300.*(physicalScreenW*.67-10);
        let last10 = [[1,0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0]]
        drawZone(this.strikezoneCanvas.nativeElement.getContext('2d'),szsize,(physicalScreenW*.67-10)/2.-szsize/2.,(physicalScreenW*.67-10)/2.-szsize/2.,this.strikezoneCanvas.nativeElement.width,this.strikezoneCanvas.nativeElement.height,true,0,last10);
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
var hdist = 0;
var vdist = 0;
var abh = [];
var abv = [];
var abhm = [];
var abvm = [];

function stopZone(tx,ty){
	stopanimate = true;
	touchx = tx;
	touchy = ty;
}

function update(leftx,topy,pitchvelocity,maxx,maxy,szsize,last10){
    let buffer = szsize/3.;
    if (leftx+pitchvelocity < maxx-szsize-buffer){
        if (leftx-pitchvelocity > buffer){
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

    if (topy+pitchvelocity < maxy-szsize-buffer){
        if (topy-pitchvelocity > buffer){
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
    if (pitchstring == 'NOTHING'){
        let i = 0;
        for (i=0;i<abh.length;i++){
            if (leftx+abh[i]*szsize/100.>0 && topy+abv[i]*szsize/100.>0){
            let ctx = strikezoneCanvas;

            canvas_arrow(ctx,leftx+abh[i]*szsize/100.-abhm[i]*szsize/100.,topy+abv[i]*szsize/100.-abvm[i]*szsize/100.,leftx+abh[i]*szsize/100.,topy+abv[i]*szsize/100.);


            ctx.fillStyle="#EEEEEE";
            ctx.beginPath();

            ctx.arc(leftx+abh[i]*szsize/100.,topy+abv[i]*szsize/100.,10,0,2*Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle="#000000";
            ctx.font = "18px Arial";
            ctx.fillText((i+1).toString(),leftx+abh[i]*szsize/100.-4,topy+abv[i]*szsize/100.+7);


        }
        }
    }
	if (pitchstring != 'NOTHING'){
	startanimate = true;
    hdist = 20;
    vdist = 30;
    let pitchn = parseInt(pitchstring);
    let rawvelocity = (pitchn*253*169)%1013;
    vdist = (pitchn*757*101)%1009;
    hdist = (pitchn*917*849)%1019;
    if (rawvelocity<-500){rawvelocity=rawvelocity+1013;}
    if (rawvelocity>500){rawvelocity=rawvelocity-1013;}
    if (hdist>500){hdist=hdist-1019;}
    if (vdist>500){vdist=vdist-1009;}
    if (hdist<-500){hdist=hdist+1019;}
    if (vdist<-500){vdist=vdist+1009;}
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
	ctx.arc(touchx+hdist,touchy+vdist,10,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

    myevent.publish('userTap',[touchx+hdist,touchy+vdist,leftx,topy,szsize,hdist,vdist]);


	stopanimate = false;
	startanimate = false;
    let element = document.getElementById('pitchinfo');
    element.innerHTML = 'NOTHING';
    requestAnimationFrame(function(timestamp) {drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,false,timestamp,last10)});
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



