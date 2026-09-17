import { Component, inject } from '@angular/core';
import { CelebService } from '../celeb-service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  celebService = inject(CelebService)
}
