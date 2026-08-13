import { Service } from '@angular/core';
import { Todo } from './todo.type';

@Service()
export class TodoService {
    todoItems : Array<Todo> = [{
        title: 'Learn Angular',
        id: 0,
        userId: 1,
        completed: false,
    }, {
        title: 'Do Homework',
        id: 1,
        userId: 1,
        completed: false,
    }]
}
