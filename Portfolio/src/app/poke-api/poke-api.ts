import { Component } from '@angular/core';

@Component({
  selector: 'app-poke-api',
  imports: [],
  templateUrl: './poke-api.html',
  styleUrl: './poke-api.css',
})
export class PokeAPI {
  // Minimal handler to satisfy template binding `(click)="searchPokemon(...)"`.
  // Replace with real API logic when ready.
  searchPokemon(query: string | undefined) {
    console.log('searchPokemon called with:', query);
    // placeholder: you can call a service or fetch the Pokemon data here
  }
}
