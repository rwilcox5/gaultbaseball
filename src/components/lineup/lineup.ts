import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the LineupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lineup',
  templateUrl: 'lineup.html',
})
export class LineupPage {
	batterids: Array<number> = [0];
	names: Array<string> = this.navParams.get('all').names;
	bats: Array<string> = this.navParams.get('all').bats;
	avgs: Array<string> = this.navParams.get('all').avgs;
	obps: Array<string> = this.navParams.get('all').obps;
	slgs: Array<string> = this.navParams.get('all').slgs;
	pas: Array<string> = this.navParams.get('all').pas;
	hrs: Array<string> = this.navParams.get('all').hrs;
	ks: Array<string> = this.navParams.get('all').ks;
	bbs: Array<string> = this.navParams.get('all').bbs;
	place: number = this.navParams.get('all').place;
	row: Array<string> = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  let i = 0;
  for (i=1;i<this.names.length;i++){
  	this.batterids.push(i);
  }
  
  this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
  this.row[this.place]='specialrow';

  }

closeModal() {
    this.viewCtrl.dismiss();
  }

  getR (){
  this.names = this.navParams.get('r').names;
	this.bats = this.navParams.get('r').bats;
	this.avgs = this.navParams.get('r').avgs;
	this.obps = this.navParams.get('r').obps;
	this.slgs = this.navParams.get('r').slgs;
	this.pas = this.navParams.get('r').pas;
	this.hrs = this.navParams.get('r').hrs;
	this.ks = this.navParams.get('r').ks;
	this.bbs = this.navParams.get('r').bbs;
	this.place = this.navParams.get('r').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  getL (){
  this.names = this.navParams.get('l').names;
	this.bats = this.navParams.get('l').bats;
	this.avgs = this.navParams.get('l').avgs;
	this.obps = this.navParams.get('l').obps;
	this.slgs = this.navParams.get('l').slgs;
	this.pas = this.navParams.get('l').pas;
	this.hrs = this.navParams.get('l').hrs;
	this.ks = this.navParams.get('l').ks;
	this.bbs = this.navParams.get('l').bbs;
	this.place = this.navParams.get('l').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  getAll (){
  this.names = this.navParams.get('all').names;
	this.bats = this.navParams.get('all').bats;
	this.avgs = this.navParams.get('all').avgs;
	this.obps = this.navParams.get('all').obps;
	this.slgs = this.navParams.get('all').slgs;
	this.pas = this.navParams.get('all').pas;
	this.hrs = this.navParams.get('all').hrs;
	this.ks = this.navParams.get('all').ks;
	this.bbs = this.navParams.get('all').bbs;
	this.place = this.navParams.get('all').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineupPage');
  }

}
