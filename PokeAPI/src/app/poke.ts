import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


interface Pokemon {
    name: string;
    }

@Injectable({
    providedIn: 'root'
})
export class PokeTs {
    http = inject(HttpClient);
    pokemons: Pokemon[] = [];

    async getPokemons(value: string) {

        const response = await firstValueFrom(this.http.get('https://pokeapi.co/api/v2/pokemon/' + value)) as Pokemon;
        this.pokemons.push(response);
    }

    
}
