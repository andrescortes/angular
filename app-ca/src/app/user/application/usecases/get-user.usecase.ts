import { inject, Injectable } from '@angular/core';
import { UseCase } from '../../../core/base/use-case.base';
import { UserModel } from '../../domain/models';
import { Observable } from 'rxjs';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class GetUserUseCase implements UseCase<string, UserModel> {
  private readonly userRepository = inject(UserRepository);

  execute(userId: string): Observable<UserModel> {
    return this.userRepository.getUserById(userId);
  }
}
