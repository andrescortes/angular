import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from '../../domain/models';
import { UserBaseUseCase } from '../base/user-use-case.base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUseCase implements UserBaseUseCase<UserModel, UserModel> {
  private readonly userRepository = inject(UserRepository);

  constructor() {
  }

  users(): Observable<UserModel[]> {
    return this.userRepository.getUsers();
  }

  userById(userId: string): Observable<UserModel> {
    return this.userRepository.getUserById(userId);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.userRepository.createUser(user);
  }

  updateUser(userId: string, user: UserModel): Observable<UserModel> {
    return this.userRepository.updateUser(userId, user);
  }

  deleteUser(userId: string): Observable<boolean> {
    return this.userRepository.deleteUser(userId);
  }

}
