import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, orderBy, query } from '@angular/fire/firestore';
import { Board } from './board';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
 
@Injectable({ providedIn: 'root' })
export class BoardService {
    private firestore = inject(Firestore);
    private taskService = inject(TaskService);

    board = signal<Board | null>(null);
    boardNotFound = signal(false);

    createNewBoard(board: Omit<Board, 'id'>) {
        return addDoc(collection(this.firestore, 'Boards'), board);
    }

    getBoards(): Observable<Board[]> {
        const boardsQuery = query(
            collection(this.firestore, 'Boards'),
            orderBy('createdAt', 'desc'),
        );

        return collectionData(boardsQuery, { idField: 'id' }) as Observable<Board[]>;
    }
    
    async clearBoard(id: string) {
        await this.taskService.deleteTasksForBoard(id);
    }

    resetBoardState() {
        this.board.set(null);
        this.boardNotFound.set(true);
    }

    async getBoard(id: string) {
        const boardRef = doc(this.firestore, 'Boards', id);
        const boardSnap = await getDoc(boardRef);

        if (!boardSnap.exists()) {
            this.board.set(null);
            this.boardNotFound.set(true);
            return null;
        }

        const result = {
            id: boardSnap.id,
            ...(boardSnap.data() as Omit<Board, 'id'>)
        } as Board;

        this.board.set(result);
        this.boardNotFound.set(false);
        return result;
    }

    async deleteBoard(id: string) {
        await this.taskService.deleteTasksForBoard(id);
        const boardRef = doc(this.firestore, 'Boards', id);
        await deleteDoc(boardRef);
        this.board.set(null);
        this.boardNotFound.set(true);
    }
}
