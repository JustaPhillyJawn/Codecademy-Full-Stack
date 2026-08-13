import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Pokemon {
    name: string;
    image: string;
    types: string[];
    moves: string[];
}

@Injectable({
    providedIn: 'root',
})
export class PokeService {
    http = inject(HttpClient);
    pokemons: Pokemon [] = [];

    async getPoke(value: string) {
        const response = await firstValueFrom(this.http.get('https://pokeapi.co/api/v2/pokemon/' + value)) as any;

        // Normalize response into our lightweight `Pokemon` shape
        const pokemon: Pokemon = {
            name: response.name || value,
            image: response.sprites?.front_default || '',
            types: Array.isArray(response.types) ? response.types.map((t: any) => t.type?.name || '') : [],
            moves: Array.isArray(response.moves) ? response.moves.slice(0, 8).map((m: any) => m.move?.name || '') : []
        };

        this.pokemons.push(pokemon);
    }
}
