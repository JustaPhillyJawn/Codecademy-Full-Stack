import { Injectable, inject } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDocs, orderBy, query, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { NewTask, TaskInterface } from './task.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'task');

  addTask(task: TaskInterface) {
    return addDoc(this.tasksCollection, task);
  }

  getTasksForBoard(boardId: string): Observable<TaskInterface[]> {
    const q = query(
      this.tasksCollection,
      where('boardId', '==', boardId),
      orderBy('createdAt', 'desc'),
    );
    return collectionData(q, { idField: 'id' }) as Observable<TaskInterface[]>;
  }

  deleteTask(id: string) {
    console.log("Deleted:", id);
    return deleteDoc(doc(this.firestore, 'task', id));
  }

  async deleteTasksForBoard(boardId: string) {
    const tasksQuery = query(this.tasksCollection, where('boardId', '==', boardId));
    const taskSnapshot = await getDocs(tasksQuery);
    const batch = writeBatch(this.firestore);

    taskSnapshot.forEach((task) => batch.delete(task.ref));
    await batch.commit();
  }

  getTaskForDoc(id: string): Observable<TaskInterface> {
    const ref = doc(this.firestore, 'task', id);
    return docData(ref, { idField: 'id' }) as Observable<TaskInterface>;
  }
  
  editTask(id: string, changes: Partial<NewTask>) {
    console.log('SERVICE updating', id, changes);
    return updateDoc(doc(this.firestore, 'task', id), changes);
  }

  
}
