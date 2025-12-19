import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  MAT_DIALOG_MOCK,
  MAT_DIALOG_REF_MOCK,
  USER_MODEL_MOCK,
  USER_USECASE_MOCK,
} from '../../../application/testings';
import { UserUseCase } from '../../../application/usecases/user.usecase';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userUsecaseMock: jasmine.SpyObj<UserUseCase> = USER_USECASE_MOCK;
  let matDialogMock: jasmine.SpyObj<MatDialog> = MAT_DIALOG_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserUseCase,
          useValue: userUsecaseMock,
        },
        {
          provide: MatDialog,
          useValue: matDialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userUsecaseMock.users.and.returnValue(of([USER_MODEL_MOCK]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadUsers', () => {
    it('should call userUsecase.users', () => {
      component.loadUsers();

      expect(userUsecaseMock.users).toHaveBeenCalled();

      expect(component.users)
        .withContext('to be equal to loaded users')
        .toEqual([USER_MODEL_MOCK]);
      expect(userUsecaseMock.users.calls.count())
        .withContext('to be greater than 1')
        .toBeGreaterThan(1);
    });
  });

  describe('deleteUser', () => {
    it('should call userUsecase.deleteUser', () => {
      userUsecaseMock.deleteUser.and.returnValue(of(true));
      const loadUserSpy = spyOn(component, 'loadUsers');

      component.deleteUser(USER_MODEL_MOCK.id);

      expect(loadUserSpy).toHaveBeenCalled();
      expect(userUsecaseMock.deleteUser).toHaveBeenCalledWith(
        USER_MODEL_MOCK.id,
      );
    });

    it('should not call loadUsers if userUsecase.deleteUser returns false', () => {
      userUsecaseMock.deleteUser.and.returnValue(of(false));
      const loadUserSpy = spyOn(component, 'loadUsers');

      component.deleteUser(USER_MODEL_MOCK.id);

      expect(userUsecaseMock.deleteUser).toHaveBeenCalledWith(
        USER_MODEL_MOCK.id,
      );
      expect(loadUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    let matDialogRefMock: jasmine.SpyObj<MatDialogRef<EditUserComponent>>;

    beforeEach(() => {
      matDialogRefMock = MAT_DIALOG_REF_MOCK;
    });

    it('should call matDialog.open', () => {
      matDialogRefMock.afterClosed.and.returnValue(of(USER_MODEL_MOCK));
      matDialogMock.open.and.returnValue(matDialogRefMock);
      userUsecaseMock.updateUser.and.returnValue(of(USER_MODEL_MOCK));

      component.openDialog(USER_MODEL_MOCK);

      expect(matDialogMock.open).toHaveBeenCalledWith(EditUserComponent, {
        width: '30%',
        height: '60%',
        position: { top: '10%' },
        data: USER_MODEL_MOCK,
      });
      expect(userUsecaseMock.updateUser).toHaveBeenCalledWith(
        USER_MODEL_MOCK.id,
        USER_MODEL_MOCK,
      );

      expect(component.users)
        .withContext('to be equal to loaded users')
        .toEqual([USER_MODEL_MOCK]);

      expect(userUsecaseMock.updateUser.calls.count()).toBe(1);
    });

    it('should not call matDialog.open if userUsecase.updateUser returns false', () => {
      matDialogMock.open.and.returnValue(matDialogRefMock);
      matDialogRefMock.afterClosed.and.returnValue(of());

      component.openDialog(USER_MODEL_MOCK);

      expect(matDialogMock.open).toHaveBeenCalledWith(EditUserComponent, {
        width: '30%',
        height: '60%',
        position: { top: '10%' },
        data: USER_MODEL_MOCK,
      });
    });
  });
});
