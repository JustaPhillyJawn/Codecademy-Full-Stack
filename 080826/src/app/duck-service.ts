import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface duckResponse {    // Define the structure of the response from the duck API
    message: string;
    status: string;
}


@Injectable({
    providedIn: 'root',
})
export class DuckService {
    http = inject(HttpClient);  // Inject the HttpClient service

    async getDuckServe() {
        const val = await firstValueFrom    // Use firstValueFrom to convert the Observable to a Promise
            (this.http.get('https://random-d.uk/api/v2/random')) as duckResponse;   // Fetch a random duck image from the API
        return val.message; // Return the image URL from the response
    }
}
