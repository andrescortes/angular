import { Observable } from "rxjs";

export interface UserBaseUseCase<I, O> {
  users(): Observable<O[]>;
  userById(userId: string): Observable<O>;
  addUser(user: I): Observable<O>;
  updateUser(userId: string, user: I): Observable<O>;
  deleteUser(userId: string): Observable<boolean>;
}
