import { Component } from '@angular/core';
import { Multiply } from '../multiply/multiply';

@Component({
  selector: 'app-basefive',
  imports: [Multiply],
  templateUrl: './basefive.html',
  styleUrl: './basefive.css',
})
export class Basefive {
  num = 5
}
