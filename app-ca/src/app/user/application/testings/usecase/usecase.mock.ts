import { UserUseCase } from '../../usecases/user.usecase';

export const USER_USECASE_MOCK: jasmine.SpyObj<UserUseCase> =
  jasmine.createSpyObj<UserUseCase>(
    'UserUseCase',
    ['users', 'userById', 'addUser', 'updateUser', 'deleteUser'],
    {},
  );
