import { Routes } from '@angular/router';
import { Catshome } from './catshome/catshome';
import { EditCatDB } from './edit-cat-db/edit-cat-db';

export const routes: Routes = [
    { path: '', component: Catshome},
    { path: 'edit', component: EditCatDB}
];
