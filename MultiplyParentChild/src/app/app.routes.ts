import { Routes } from '@angular/router';
import { Basefour } from './basefour/basefour';
import { Basefive } from './basefive/basefive';
import { Basesix } from './basesix/basesix';

export const routes: Routes = [
    {path: "basefour", component: Basefour},
    {path: "basefive", component: Basefive},
    {path: "basesix", component: Basesix},
];
