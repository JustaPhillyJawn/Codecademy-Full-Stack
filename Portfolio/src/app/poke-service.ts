import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Pokemon {
    name: string;
    image: string;
}

@Injectable({
    providedIn: 'root',
})
export class PokeService {
    http = inject(HttpClient);
    pokemons: Pokemon [] = [];

    async getPoke(value: string) {
        const response = await firstValueFrom(this.http.get('https://pokeapi.co/api/v2/pokemon/' + value)) as Pokemon;

        // Normalize response into our lightweight `Pokemon` shape
        const pokemon = {
            name: response.name || value,
            image: response.sprites.front_default || '',
        };
        this.pokemons.push(pokemon);
    }
}
