import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {path: '', component: Welcome},
    {path: 'user', component: UserComponent},
];
