import { Component, inject, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userService = inject(UserService);
  users = this.userService.users;
  curUser: null | User = null;
  selectUser(user: User) {
    this.curUser = user;
  }
  onClear() {
    this.curUser = null;
  }
}
