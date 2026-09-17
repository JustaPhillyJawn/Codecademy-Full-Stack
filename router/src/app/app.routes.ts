import { Routes } from '@angular/router';
import { List } from './list/list';
import { Read } from './read/read';

export const routes: Routes = [

    {path: '', component: List},
    {path: 'read', component: Read},
    
];
