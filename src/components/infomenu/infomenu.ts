import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the InfomenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'infomenu',
  templateUrl: 'infomenu.html'
})
export class InfomenuComponent {

  text: string;

  constructor(private alertCtrl: AlertController) {
    console.log('Hello InfomenuComponent Component');
    this.text = 'Hello World';
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
  }
}
