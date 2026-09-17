import { inject, Injectable, Service } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Cats {
    id?: string;
    name: string;
    color: string;
    breed: string;
}

@Service ()
export class CatsService {
    private readonly firestore = inject(Firestore);
    private readonly catsCol = collection(this.firestore, 'catsdb');

getCatsfromDB$() {
    return collectionData(this.catsCol, { idField: 'id' }) as Observable<Cats[]>;
}

addCatToDB(cat: Cats) {
    return addDoc(this.catsCol, cat);

}
}
