import { Routes } from '@angular/router';
import { List } from './list/list';
import { Read } from './read/read';
import { Home } from './home/home';
import { CarDetails } from './car-details/car-details';

export const routes: Routes = [
    {path: 'cars', component: List},
    {path: 'read', component: Read},
    {path: '', component: Home},
    {path: 'cars/:id', component: CarDetails},


];