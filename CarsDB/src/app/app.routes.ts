import { Routes } from '@angular/router';
import { Car } from './car/car';
import { AddCar } from './add-car/add-car';
import { Cardetails } from './cardetails/cardetails';

export const routes: Routes = [
    { path: '', component: Car },
    { path: 'addcar', component: AddCar},
    { path: 'cars/:id', component: Cardetails }
];
   