import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  result = 0;

  addNumbers(input1: string, input2: string) {
    const num1 = Number(input1);
    const num2 = Number(input2);
    this.result = num1 + num2;
  }

}
