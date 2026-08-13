import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface dogResponse {
    message: string;
    status: string;
}

@Injectable({
    providedIn: 'root',
})
export class TestServ {
    http = inject(HttpClient);

    async getTestServe() {
        const val = await firstValueFrom
            (this.http.get('https://dog.ceo/api/breeds/image/random')) as dogResponse;
        return val.message;
    }
}
