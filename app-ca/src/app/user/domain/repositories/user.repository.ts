import { Observable } from "rxjs";
import { UserModel } from "../models";

export abstract class UserRepository {
    abstract getUsers(): Observable<UserModel[]>;
    abstract getUserById(id: string): Observable<UserModel>;
    abstract createUser(user: Omit<UserModel, 'id'>): Observable<UserModel>;
    abstract updateUser(id: string, user: Partial<UserModel>): Observable<UserModel>;
    abstract deleteUser(id: string): Observable<boolean>;
}