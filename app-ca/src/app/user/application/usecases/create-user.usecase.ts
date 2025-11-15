import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UseCase } from '../../../core/base/use-case.base';
import { UserModel } from '../../domain/models';
import { Observable } from 'rxjs';

export interface CreateUserParams {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserUseCase implements UseCase<CreateUserParams, UserModel> {
  private readonly userRepository = inject(UserRepository);

  execute(params: CreateUserParams): Observable<UserModel> {
    const userToCreate: Omit<UserModel, 'id'> = {
      name: params.name,
      email: params.email,
      createAt: new Date()
    };
    return this.userRepository.createUser(userToCreate);
  }
}
