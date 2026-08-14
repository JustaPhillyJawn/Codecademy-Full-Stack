import { Component } from '@angular/core';
import { Multiply } from '../multiply/multiply';

@Component({
  selector: 'app-basefour',
  imports: [Multiply],
  templateUrl: './basefour.html',
  styleUrl: './basefour.css',
})
export class Basefour {
  num = 4;
}
