import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { DocView } from './doc-view/doc-view';

export const routes: Routes = [
    { path: '', component: Homepage},
    { path: 'doc', component: DocView},
];
