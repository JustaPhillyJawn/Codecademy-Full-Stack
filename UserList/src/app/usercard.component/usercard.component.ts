import { Component, Input } from '@angular/core';
import { User } from '../user.service';

@Component({
  selector: 'app-usercard',
  imports: [],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  @Input() user: User | null = null;
}
