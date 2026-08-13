import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  todoService = inject(TodoService)

  ngOnInit(): void {
    console.log(this.todoService.todoItems)
  }
}
