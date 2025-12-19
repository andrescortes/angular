import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MAT_DIALOG_REF_MOCK,
  USER_MODEL_MOCK,
} from '../../../application/testings';
import { UserModel } from '../../../domain/models';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  const dialogRefMock: jasmine.SpyObj<MatDialogRef<EditUserComponent>> =
    MAT_DIALOG_REF_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserComponent, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: USER_MODEL_MOCK,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNoClick', () => {
    it('should call dialogRef.close', () => {
      component.onNoClick();
      expect(dialogRefMock.close).toHaveBeenCalled();
    });
  });

  describe('updateErrorMessage', () => {
    beforeEach(() => {
      component.userForm = new FormBuilder().group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        createdAt: ['', [Validators.required]],
      });
    });

    it('should call buildErrorMessages', () => {
      const field = 'name';
      component.updateErrorMessage(field);

      expect(component.errorMessage.get(field)).toEqual('name is required');
    });

    it('should call buildErrorMessages with email validation', () => {
      const field = 'email';
      component.userForm.get('email')?.setValue('asdf');

      component.updateErrorMessage(field);

      expect(component.errorMessage.get(field)).toEqual(
        'email must be a valid email address',
      );
    });

    it('should not call buildErrorMessages', () => {
      const field = 'name';
      component.userForm.get('name')?.setValue('John Doe');
      const buildErrorMessagesSpy = spyOn(component, 'buildErrorMessages');

      component.updateErrorMessage(field);

      expect(buildErrorMessagesSpy).not.toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    beforeEach(() => {
      component.userForm = new FormBuilder().group({
        id: ['1'],
        name: ['John Doe', [Validators.required, Validators.minLength(3)]],
        email: ['john@doe', [Validators.required, Validators.email]],
        createdAt: ['2023-08-09', [Validators.required]],
      });
    });

    it('should return a user', () => {
      const user: UserModel = component.createUser();
      expect(user.id).toEqual('1');
      expect(user.name).toEqual('John Doe');
      expect(user.email).toEqual('john@doe');
      expect(user.createdAt).toEqual('2023-08-09');
    });
  });

  describe('loadUserForm', () => {
    it('should call userForm.patchValue', () => {
      component.loadUserForm();

      expect(component.userForm.get('id')?.value).toEqual(USER_MODEL_MOCK.id);
      expect(component.userForm.get('name')?.value).toEqual(
        USER_MODEL_MOCK.name,
      );
      expect(component.userForm.get('email')?.value).toEqual(
        USER_MODEL_MOCK.email,
      );
      expect(component.userForm.get('createdAt')?.value).toEqual(
        '2023-08-09T00:00:00.000Z'
      );
    });
  });
});
