import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserUseCase } from '../../../application/usecases/user.usecase';
import { UserModel } from '../../../domain/models';

@Component({
  selector: 'app-user-list',
  imports: [ DatePipe, TitleCasePipe ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private readonly userUsecase = inject(UserUseCase);
  users: UserModel[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userUsecase.users().subscribe((users) => {
      this.users = users;
    });
  }
}
