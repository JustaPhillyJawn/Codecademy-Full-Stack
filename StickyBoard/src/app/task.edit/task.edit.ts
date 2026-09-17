import { Component, computed, effect, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, of, switchMap } from 'rxjs';
import { TaskStatus } from '../task.interface';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-edit',
  styleUrl: './task.edit.css',
  templateUrl: './task.edit.html',
})
export class TaskEdit {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  private params = toSignal(this.route.paramMap);
  boardId = computed(() => this.params()?.get('boardId') ?? '');
  taskId = computed(() => this.params()?.get('taskId') ?? '');
  task = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('taskId')),
      switchMap((id) => id ? this.taskService.getTaskForDoc(id) : of(null)),
    ),
    { initialValue: null },
  );

  editForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    details: [''],
    color: ['yellow'],
    status: this.fb.nonNullable.control<TaskStatus>('todo'),
  });

  constructor() {
    effect(() => {
      const task = this.task();

      if (task) {
        this.editForm.patchValue({
          title: task.title,
          details: task.details,
          color: task.color,
          status: task.status,
        });
      }
    });
  }

  async onSubmit() {
    if (this.editForm.invalid || !this.taskId()) return;

    await this.taskService.editTask(this.taskId(), this.editForm.getRawValue());
    await this.router.navigate(['/board', this.boardId()]);
  }

  async cancel() {
    await this.router.navigate(['/board', this.boardId()]);
  }
}