import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { AboutPage } from './about-page/about-page';
import { ProjectsPage } from './projects-page/projects-page';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'about', component: AboutPage },
    { path: 'projects', component: ProjectsPage },
];