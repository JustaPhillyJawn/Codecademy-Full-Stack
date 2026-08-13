import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PokeService } from '../poke-service';

@Component({
  selector: 'app-poke-api',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './poke-api.html',
  styleUrls: ['./poke-api.css'],
})
export class PokeAPI {
  pokeService = inject(PokeService);

  async searchClick(value: string) {
    await this.pokeService.getPoke(value);
  }

  trackByIndex(_index: number, _item: any) {
    return _index;
  }
}
