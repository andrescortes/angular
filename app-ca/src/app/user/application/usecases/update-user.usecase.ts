import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case.base';
import { UserModel } from '../../domain/models';
import { UserRepository } from '../../domain/repositories/user.repository';

export interface UpdateUserParams {
  id: string;
  user: Partial<UserModel>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateUserUseCase implements UseCase<UpdateUserParams, UserModel> {
  private readonly userRepository = inject(UserRepository);

  execute(params: UpdateUserParams): Observable<UserModel> {
    return this.userRepository.updateUser(params.id, params.user);
  }
}
