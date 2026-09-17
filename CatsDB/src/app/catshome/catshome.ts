import { Component, inject } from '@angular/core';
import { CatsService } from '../cats.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-catshome',
  styleUrl: './catshome.css',
  templateUrl: './catshome.html',
})
export class Catshome {
  CatService = inject(CatsService);
  getCatsfromDB = toSignal(this.CatService.getCatsfromDB$());
  
  }
