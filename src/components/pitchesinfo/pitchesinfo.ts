import { Component } from '@angular/core';
import { StrikezoneComponentModule } from '../../components/strikezone/strikezone.module';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PitchesinfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pitchesinfo',
  templateUrl: 'pitchesinfo.html'
})
export class PitchesinfoComponent {
  

  constructor() {
    console.log('Hello PitchesinfoComponent Component');
    
  }

  fastball() {
    let element = document.getElementById('pitchinfo');
    element.innerHTML = element.innerHTML.concat('1');
    console.log(element.innerHTML);
    console.log('Fastball');

  }


  


}


