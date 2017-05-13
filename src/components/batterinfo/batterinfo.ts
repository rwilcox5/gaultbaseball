import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

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

  constructor(storage: Storage) {
  let i = 0;
  let cutoffs = [.6,.55,.525,.5,.475,.45,.425,.4,.375,.35,.325,.3,.275,.25,.2];
  let aahold = ['blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue','blue'];
  storage.ready().then(() => {
       storage.get('player1').then((val) => {this.avg = val.stats.avg; this.obp = val.stats.obp; this.slg = val.stats.slg;
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

  }

}
