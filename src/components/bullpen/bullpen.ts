import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the BullpenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bullpen',
  templateUrl: 'bullpen.html',
})
export class BullpenPage {
	batterids: Array<number> = [0];
	names: Array<string> = this.navParams.get('all').names;
	throws: Array<string> = this.navParams.get('all').throws;
	eras: Array<string> = this.navParams.get('all').eras;
	avgs: Array<string> = this.navParams.get('all').avgs;
	obps: Array<string> = this.navParams.get('all').obps;
	slgs: Array<string> = this.navParams.get('all').slgs;
	ips: Array<string> = this.navParams.get('all').ips;
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
	this.throws = this.navParams.get('r').throws;
	this.eras = this.navParams.get('r').eras;
	this.avgs = this.navParams.get('r').avgs;
	this.obps = this.navParams.get('r').obps;
	this.slgs = this.navParams.get('r').slgs;
	this.ips = this.navParams.get('r').ips;
	this.hrs = this.navParams.get('r').hrs;
	this.ks = this.navParams.get('r').ks;
	this.bbs = this.navParams.get('r').bbs;
	this.place = this.navParams.get('r').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  getL (){
  this.names = this.navParams.get('l').names;
	this.throws = this.navParams.get('l').throws;
	this.eras = this.navParams.get('l').eras;
	this.avgs = this.navParams.get('l').avgs;
	this.obps = this.navParams.get('l').obps;
	this.slgs = this.navParams.get('l').slgs;
	this.ips = this.navParams.get('l').ips;
	this.hrs = this.navParams.get('l').hrs;
	this.ks = this.navParams.get('l').ks;
	this.bbs = this.navParams.get('l').bbs;
	this.place = this.navParams.get('l').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  getAll (){
  this.names = this.navParams.get('all').names;
	this.throws = this.navParams.get('all').throws;
	this.eras = this.navParams.get('all').eras;
	this.avgs = this.navParams.get('all').avgs;
	this.obps = this.navParams.get('all').obps;
	this.slgs = this.navParams.get('all').slgs;
	this.ips = this.navParams.get('all').ips;
	this.hrs = this.navParams.get('all').hrs;
	this.ks = this.navParams.get('all').ks;
	this.bbs = this.navParams.get('all').bbs;
	this.place = this.navParams.get('all').place;
	this.row = ['normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow','normalrow'];
	this.row[this.place]='specialrow';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BullpenPage');
  }

 }
