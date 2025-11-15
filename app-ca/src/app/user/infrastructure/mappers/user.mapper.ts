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
      name: entity.full_name,
      email: entity.email_address,
      createAt: new Date(entity.create_date)
    };
  }

  override mapTo(model: UserModel): UserEntity {
    return {
      id: model.id,
      full_name: model.name,
      email_address: model.email,
      create_date: model.createAt.toISOString()
    }
  }
}
