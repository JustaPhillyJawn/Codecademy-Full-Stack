import { Routes } from '@angular/router';
import { About } from './about/about';
import { Home } from './home/home';
import { Learn } from './learn/learn';
import { HomeWork } from './home-work/home-work';
import { Test } from './test/test';

export const routes: Routes = [
    {path: 'about', component: About},
    {path: '', component: Home},
    {path: 'learn', component: Learn},
    {path: 'homework', component: HomeWork},
    {path: 'test', component: Test}
];