import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeTs } from './poke';
import { inject, Injectable } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  pokeInject = inject(PokeTs);
  searchPokemon(value: string) {
    this.pokeInject.getPokemons(value);
    console.log(value);
  }
}
