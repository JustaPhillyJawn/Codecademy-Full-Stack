import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { AboutPage } from './about-page/about-page';
import { StorePage } from './store-page/store-page';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'about', component: AboutPage },
    { path: 'store', component: StorePage },
];