import { Provider } from "@angular/core";
import { UserRepository } from "./domain/repositories/user.repository";
import { UserRepositoryImpl } from "./infrastructure/repositories/user-impl.repository";

export const userProvider: Provider = {
  provide: UserRepository,
  useClass: UserRepositoryImpl
};
