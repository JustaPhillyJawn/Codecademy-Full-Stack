import { Component, input } from '@angular/core';

@Component({
  selector: 'app-multiply',
  imports: [],
  templateUrl: './multiply.html',
  styleUrl: './multiply.css',
})
export class Multiply {
  numInput = input(1);
}
