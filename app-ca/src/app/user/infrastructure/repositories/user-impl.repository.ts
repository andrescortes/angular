import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { map, Observable } from 'rxjs';
import { UserModel } from '../../domain/models';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryImpl extends UserRepository {
  private readonly URL_USERS = environment.BASE_URL_USERS;
  private readonly httpClient = inject(HttpClient);
  private readonly userMapper = inject(UserMapper);

  constructor() {
    super();
    console.log('URL_USERS: ', this.URL_USERS);
    console.log('environment.production :>> ', environment.production);
  }

  override getUsers(): Observable<UserModel[]> {
    return this.httpClient
      .get<UserEntity[]>(`${this.URL_USERS}/users`)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.userMapper.mapFrom(entity)),
        ),
      );
  }

  override getUserById(id: string): Observable<UserModel> {
    return this.httpClient
      .get<UserEntity>(`${this.URL_USERS}/users/${id}`)
      .pipe(map((entity) => this.userMapper.mapFrom(entity)));
  }

  override createUser(user: Omit<UserModel, 'id'>): Observable<UserModel> {
    const entity = this.userMapper.mapTo({ ...user, id: '' } as UserModel);
    return this.httpClient
      .post<UserEntity>(`${this.URL_USERS}/users`, entity)
      .pipe(map((entity) => this.userMapper.mapFrom(entity)));
  }

  override updateUser(
    id: string,
    user: Partial<UserModel>,
  ): Observable<UserModel> {
    return this.httpClient
      .patch<UserEntity>(`${this.URL_USERS}/users/${id}`, user)
      .pipe(map((entity) => this.userMapper.mapFrom(entity)));
  }

  override deleteUser(id: string): Observable<boolean> {
    return this.httpClient
      .delete(`${this.URL_USERS}/users/${id}`)
      .pipe(map(() => true));
  }
}
