export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface TaskInterface {
    id: string;
    boardId: string;
    title: string;
    details: string;
    color: string;      // which sticky-note color the user picked
    status: TaskStatus;
    createdAt: number;  // Date.now() — so we can sort newest first
}

export type NewTask = Omit<TaskInterface, 'id'>;