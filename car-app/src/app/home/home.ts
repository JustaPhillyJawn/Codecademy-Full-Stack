import { Component, inject } from '@angular/core';
import { Cars } from '../cars';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  carService = inject(Cars);
}
