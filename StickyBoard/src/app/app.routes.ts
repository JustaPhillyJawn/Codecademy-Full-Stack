import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { BoardComponent } from './board.component/board.component';
import { TaskEdit } from './task.edit/task.edit';

export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'board/:id', component: BoardComponent},
    { path: 'board/:boardId/edit/:taskId', component: TaskEdit}
];
