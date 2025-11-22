import { DatePipe, formatDate, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserUseCase } from '../../../application/usecases/user.usecase';
import { UserModel } from '../../../domain/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe, TitleCasePipe, MatIconModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private readonly userUsecase = inject(UserUseCase);
  readonly dialog = inject(MatDialog);
  users: UserModel[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userUsecase.users().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string): void {
    this.userUsecase.deleteUser(userId).subscribe({
      next: isDeleted => {
        if (isDeleted) {
          this.loadUsers();
        }
      },
      error: err => {
        console.error('Error deleting user:', err);
      }
    })
  }

  openDialog(user: UserModel): void {
    console.log('user :>> ', user);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '30%',
      height: '60%',
      position: {
        top: '10%',
      },
      data: user,
    });

    dialogRef.afterClosed().subscribe({
      next: (userUpdated: UserModel) => {
        if (userUpdated) {
          const formattedDate = formatDate(userUpdated.createdAt, 'yyyy-MM-dd', 'en-US');
          userUpdated.createdAt = formattedDate;
          this.userUsecase.updateUser(userUpdated.id, userUpdated).subscribe({
            next: user => {
              this.users = this.users.map(u => u.id === user.id ? user : u);
            }
          })
        }
      },
      error: err => {
        console.error('Error after closing dialog:', err);
      }
    });
  }
}
