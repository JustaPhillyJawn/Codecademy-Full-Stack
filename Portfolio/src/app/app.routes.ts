import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { AboutPage } from './about-page/about-page';
import { ProjectsPage } from './projects-page/projects-page';
import { PokeAPI } from './poke-api/poke-api';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'about', component: AboutPage },
        { path: 'projects', component: ProjectsPage, children: [
            {path: 'pokeapi', component: PokeAPI}
        ]},
];
