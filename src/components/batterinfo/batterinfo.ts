import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the BatterinfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'batterinfo',
  templateUrl: 'batterinfo.html'
})
export class BatterinfoComponent {

  aa: Array<string>;
  avg: string;
  obp: string;
  slg: string;
  k: string;
  pa: string;
  bb: string;
  hr: string;

  avgH: string;
  obpH: string;
  slgH: string;
  kH: string;
  paH: string;
  bbH: string;
  hrH: string;

  batterid: number = 1;
  battername: string;
  today: string;

  constructor(public storage: Storage, public events: Events) {
  let i = 0;
  let cutoffs = [.6,.55,.525,.5,.475,.45,.425,.4,.375,.35,.325,.3,.275,.25,.2];
  let aahold = ['blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue'];
  storage.ready().then(() => {
       storage.get('player'.concat(this.batterid.toString())).then((val) => {
       this.battername = val.name;
       this.today = '2-4 (HR,3B,KK,BB,GO,FO)';
       this.avg = val.stats.avg.toFixed(3); this.obp = val.stats.obp.toFixed(3); this.slg = val.stats.slg.toFixed(3); this.k = val.stats.k; this.pa = val.stats.pa; this.bb = val.stats.bb; this.hr = val.stats.hr;
       this.avgH = val.statsR.avg.toFixed(3); this.obpH = val.statsR.obp.toFixed(3); this.slgH = val.statsR.slg.toFixed(3); this.kH = val.statsR.k; this.paH = val.statsR.pa; this.bbH = val.statsR.bb; this.hrH = val.statsR.hr;
       for (i=0;i<25;i++){
	       if (val.zones[i][0]/val.zones[i][1]>cutoffs[0]){ aahold[i] = 'red8'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[1]){ aahold[i] = 'red7'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[2]){ aahold[i] = 'red6'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[3]){ aahold[i] = 'red5'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[4]){ aahold[i] = 'red4'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[5]){ aahold[i] = 'red3'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[6]){ aahold[i] = 'red2'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[7]){ aahold[i] = 'red1'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[8]){ aahold[i] = 'blue1'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[9]){ aahold[i] = 'blue2'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[10]){ aahold[i] = 'blue3'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[11]){ aahold[i] = 'blue4'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[12]){ aahold[i] = 'blue5'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[13]){ aahold[i] = 'blue6'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[14]){ aahold[i] = 'blue7'; }
	       else { aahold[i] = 'blue8'; }
       }

       })
     });

     this.aa = aahold;
     console.log(this.aa[24]);
    console.log('Hello BatterinfoComponent Component');
    this.events.subscribe('centralBatter', val => {
     this.batterid = val;

     storage.ready().then(() => {
       storage.get('player'.concat(this.batterid.toString())).then((val) => {
       this.battername = val.name;
       this.today = '2-4 (HR,3B,KK,BB,GO,FO)';
       this.avg = val.stats.avg.toFixed(3); this.obp = val.stats.obp.toFixed(3); this.slg = val.stats.slg.toFixed(3); this.k = val.stats.k; this.pa = val.stats.pa; this.bb = val.stats.bb; this.hr = val.stats.hr;
       this.avgH = val.statsR.avg.toFixed(3); this.obpH = val.statsR.obp.toFixed(3); this.slgH = val.statsR.slg.toFixed(3); this.kH = val.statsR.k; this.paH = val.statsR.pa; this.bbH = val.statsR.bb; this.hrH = val.statsR.hr;
       for (i=0;i<25;i++){
	       if (val.zones[i][0]/val.zones[i][1]>cutoffs[0]){ aahold[i] = 'red8'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[1]){ aahold[i] = 'red7'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[2]){ aahold[i] = 'red6'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[3]){ aahold[i] = 'red5'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[4]){ aahold[i] = 'red4'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[5]){ aahold[i] = 'red3'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[6]){ aahold[i] = 'red2'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[7]){ aahold[i] = 'red1'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[8]){ aahold[i] = 'blue1'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[9]){ aahold[i] = 'blue2'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[10]){ aahold[i] = 'blue3'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[11]){ aahold[i] = 'blue4'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[12]){ aahold[i] = 'blue5'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[13]){ aahold[i] = 'blue6'; }
	       else if (val.zones[i][0]/val.zones[i][1]>cutoffs[14]){ aahold[i] = 'blue7'; }
	       else { aahold[i] = 'blue8'; }
       }

       })
     });


    });
  }

}
