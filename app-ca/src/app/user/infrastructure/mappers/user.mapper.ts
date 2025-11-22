import { Injectable } from '@angular/core';
import { Mapper } from '../../../core/base/mapper.base';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../../domain/models';

@Injectable({
  providedIn: 'root'
})
export class UserMapper extends Mapper<UserEntity, UserModel> {

  override mapFrom(entity: UserEntity): UserModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt
    };
  }

  override mapTo(model: UserModel): UserEntity {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      createdAt: model.createdAt
    }
  }
}
