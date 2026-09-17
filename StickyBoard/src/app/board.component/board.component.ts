import { Component, effect, inject } from '@angular/core';
import { BoardService } from '../board.service';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskInterface, TaskStatus } from '../task.interface';

@Component({
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  selector: 'app-board.component',
  styleUrl: './board.component.css',
  templateUrl: './board.component.html',
})
export class BoardComponent {
  private boardService = inject(BoardService);
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  board = this.boardService.board;
  tasks = toSignal(this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((boardId) => boardId ? this.taskService.getTasksForBoard(boardId) : of([])),
  ), {
    initialValue: [] as TaskInterface[],
  });
  boardNotFound = this.boardService.boardNotFound;

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    details: [''],
    color: ['yellow'],
  });

  routeId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: null,
  });

  tasksForStatus(status: TaskStatus): TaskInterface[] {
    return this.tasks().filter((task) => task.status === status);
  }

  constructor() {
    effect(() => {
      const id = this.routeId();

      if (!id) {
        this.boardService.resetBoardState();
        return;
      }

      void this.boardService.getBoard(id);
    });
  }

  async onSubmit() {
    if (this.taskForm.invalid) return;

    const boardId = this.routeId();

    if (!boardId) return;

    const newTask: TaskInterface = {
      ...this.taskForm.getRawValue(),
      boardId,
      status: 'todo',
      createdAt: Date.now(),
      id: '',
    };

    await this.taskService.addTask(newTask);
    this.taskForm.reset({ color: 'yellow' });

  }

  getBoardDate(): Date | null {
    const value = this.board()?.createdAt;

    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    if ('toDate' in value && typeof value.toDate === 'function') {
      return value.toDate();
    }

    return null;
  }

  async deleteTask(id: string) {
    if (!confirm('Delete this task?')) return;
    await this.taskService.deleteTask(id);
    console.log("Deleted:", id);
  }

  async editTask(id: string) {
    const boardId = this.routeId();

    if (!boardId) return;

    await this.router.navigate(['/board', boardId, 'edit', id]);
  }

  async deleteBoard(id: string) {
    if (!confirm('Delete this board?')) return;
    await this.boardService.deleteBoard(id);
    await this.router.navigate(['/']);
    console.log("Deleted:", id);
  }

  async clearBoard() {
    const boardId = this.routeId();

    if (!boardId) return;
    if (!confirm('Clear this board? This will permanently delete all tasks.')) return;
    await this.boardService.clearBoard(boardId);
  }
}
