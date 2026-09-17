import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Car {
    id: string;
    make: string | null;
    model: string | null;
};

@Injectable({ providedIn: 'root' })
export class Cars {
    private readonly firestore = inject(Firestore);
    private readonly carsCol = collection(this.firestore, 'CarsList');


getCars$() {
  return collectionData(this.carsCol, { idField: 'id' }) as Observable<Car[]>;
  }

deleteCarFromDB(id:string) {
  return deleteDoc(doc(this.firestore, 'CarsList', id));
  console.log(id, "Clicked Delete Button");
}

addCarToDB(car: Omit<Car, 'id'>) {
    return addDoc(this.carsCol, car);
  }

editCar(id:string) {
    console.log(id);


}
}