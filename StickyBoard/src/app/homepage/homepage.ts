import { Component, inject } from '@angular/core';
import { BoardService } from '../board.service';
import { Router } from '@angular/router';
import { Board } from '../board';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  styleUrl: './homepage.css',
  templateUrl: './homepage.html',
})
export class Homepage {
  private boardService = inject(BoardService);
  private router = inject(Router);

  boards = toSignal(this.boardService.getBoards(), {
    initialValue: [] as Board[],
  });

  createNewBoard(titleText: string): void {
    const title = titleText?.trim();

    if (!title) {
      return;
    }

    const newBoard: Omit<Board, 'id'> = {
      title,
      createdAt: new Date(),
    };

    this.boardService.createNewBoard(newBoard).then((boardRef) => {
      console.log('Document written with ID: ', boardRef.id);
      this.router.navigate(['/board', boardRef.id]);
    });
  }

  openBoard(id: string): void {
    void this.router.navigate(['/board', id]);
  }
}

