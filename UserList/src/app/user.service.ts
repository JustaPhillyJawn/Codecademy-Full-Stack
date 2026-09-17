import { Service, Signal, signal } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Service()
export class UserService {
  users: Signal<User[]> = signal([
    { id: 1, firstName: 'John', lastName: 'Snow' },
    { id: 2, firstName: 'Eddard', lastName: 'Stark' },
    { id: 3, firstName: 'Jamie', lastName: 'Lannister' },
  ]);

}
