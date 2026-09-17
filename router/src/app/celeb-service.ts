import { Service, Signal, signal } from '@angular/core';

export interface Celeb{
    id: number;
    name: string;
    image: string;
}


@Service()


export class CelebService {
    all: Signal<Celeb[]> = signal([
        {
            id: 1,
            name: 'Michael B. Jordan',
            image: 'https://www.google.com/imgres?q=michael%20b%20jordan&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F23%2FMichael_B_Jordan_-_Sinners_%2528cropped%2529.jpg%3Futm_source%3Den.wikipedia.org%26utm_campaign%3Dindex%26utm_content%3Doriginal&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMichael_B._Jordan&docid=_1fyETm9pZWQbM&tbnid=Ev6rdUvGy2k4JM&vet=12ahUKEwjp2_aGp6uWAxWVKVkFHXzWDicQnPAOegQIJRAA..i&w=1104&h=1472&hcb=2&ved=2ahUKEwjp2_aGp6uWAxWVKVkFHXzWDicQnPAOegQIJRAA'
        }
    ]
    )
}