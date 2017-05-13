import { Component } from '@angular/core';

/**
 * Generated class for the ScoreboardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'scoreboard',
  templateUrl: 'scoreboard.html'
})
export class ScoreboardComponent {

  text: string;

  constructor() {
    console.log('Hello ScoreboardComponent Component');
    this.text = 'Hello World';
  }

}
