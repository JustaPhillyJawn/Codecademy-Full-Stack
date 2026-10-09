import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../board.service';
import { Router } from '@angular/router';
import { Board } from '../board';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  imports: [FormsModule],
  styleUrl: './homepage.css',
  templateUrl: './homepage.html',
})
export class Homepage {
  private boardService = inject(BoardService);
  private router = inject(Router);
  readonly authService = inject(AuthService);
  readonly authError = signal('');

  boards = toSignal(this.boardService.getBoards(), {
    initialValue: [] as Board[],
  });

  async authenticate(email: string, password: string, mode: 'sign-in' | 'sign-up'): Promise<void> {
    this.authError.set('');

    try {
      if (mode === 'sign-up') {
        await this.authService.signUp(email, password);
      } else {
        await this.authService.signIn(email, password);
      }
    } catch (error) {
      this.authError.set(error instanceof Error ? error.message : 'Authentication failed.');
    }
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
  }

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
      this.router.navigate(['/board', boardRef.id]);
    });
  }

  openBoard(id: string): void {
    void this.router.navigate(['/board', id]);
  }
}

