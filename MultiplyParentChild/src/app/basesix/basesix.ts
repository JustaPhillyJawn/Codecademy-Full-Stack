import { Component } from '@angular/core';
import { Multiply } from '../multiply/multiply';

@Component({
  selector: 'app-basesix',
  imports: [Multiply],
  templateUrl: './basesix.html',
  styleUrl: './basesix.css',
})
export class Basesix {
  num = 6;
}
