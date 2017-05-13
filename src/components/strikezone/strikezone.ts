import { Component, ViewChild } from '@angular/core';

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

  constructor() {


  }


	ngAfterViewInit(){  
        let myelement = document.getElementById('scoreboard');
        let physicalScreenW = myelement.getBoundingClientRect().width;
        console.log(this.strikezoneCanvas.nativeElement.width);
        this.strikezoneCanvas.nativeElement.width = physicalScreenW*.7-10;
        this.strikezoneCanvas.nativeElement.height = physicalScreenW*.7-10;
        console.log(this.strikezoneCanvas.nativeElement.width);
        let szsize = 125./300.*(physicalScreenW*.7-10);
        drawZone(this.strikezoneCanvas.nativeElement.getContext('2d'),szsize,10,10,this.strikezoneCanvas.nativeElement.width,this.strikezoneCanvas.nativeElement.height,true,0);
    }

    onTap(event){
    stopZone(event.srcEvent.offsetX,event.srcEvent.offsetY);
    }




}

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

function update(leftx,topy,pitchvelocity,maxx,maxy,szsize){
    if (leftx+pitchvelocity < maxx-szsize-10){
        if (leftx-pitchvelocity > 10){
            let randx = Math.random();
            if (randx < 1./(1.+10.**((leftx-88.)/270.))){
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
            if (randx < 1./(1.+10.**((topy-88.)/270.))){
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
function drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,clearit,timestamp){
	let element = document.getElementById('pitchinfo');
	let pitchstring = element.innerText || element.textContent;
	if (pitchstring != 'NOTHING'){
	startanimate = true;
    let pitchn = parseInt(pitchstring);
    let rawvelocity = (pitchn*253*169)%1013;
    let rawtimes = (rawvelocity+10.)/5.;
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
    console.log(ntimes);
    for (i=0;i<ntimes;i++){
    let locat = update(leftx,topy,pitchvelocity,maxx,maxy,szsize);
    leftx = locat[0];
    topy =locat[1];
    }
    }

    requestAnimationFrame(function(timestamp) {drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,startanimate,timestamp)});
    }

    else{
    ctx.clearRect(0, 0, maxx,maxy);
    console.log(leftx);
    console.log(touchx);
    console.log(topy);
    console.log(touchy);
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
	stopanimate = false;
	startanimate = false;
    let element = document.getElementById('pitchinfo');
    element.innerHTML = 'NOTHING';
    requestAnimationFrame(function(timestamp) {drawZone(strikezoneCanvas,szsize,leftx,topy,maxx,maxy,false,timestamp)});
    }
    

  }