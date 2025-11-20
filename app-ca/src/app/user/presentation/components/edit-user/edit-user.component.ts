import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserModel } from '../../../domain/models';
import { TitleCasePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-user',
  providers: [ provideNativeDateAdapter() ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    TitleCasePipe,
    MatDatepickerModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditUserComponent>);
  readonly data = inject<UserModel>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  userForm = this.fb.group({
    id: [ '' ],
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    createdAt: [ '', [ Validators.required ] ],
  });
  errorMessage: Map<string, string> = new Map();

  get id() {
    return this.userForm.get('id')!;
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get createdAt() {
    return this.userForm.get('createdAt')!;
  }

  ngOnInit(): void {
    if (this.data) {
      this.loadUser();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
  }

  updateErrorMessage(field: string): void {
    const control = this.userForm.get(field);

    if (control && control.errors) {
      const firstKey = Object.keys(control.errors)[ 0 ];
      this.buildErrorMessages(field, firstKey);
    }
  }

  buildErrorMessages(field: string, error: string): void {
    if (error === 'required') {
      this.errorMessage.set(field, `${field} is required`);
    } else if (error === 'minlength') {
      this.errorMessage.set(field, `${field} must be at least 3 characters long`);
    } else if (error === 'email') {
      this.errorMessage.set(field, `${field} must be a valid email address`);
    } else {
      this.errorMessage.delete(field);
    }
  }

  createUser(): UserModel {
    const { name, email, createdAt } = this.userForm.getRawValue();
    return {
      ...this.data,
      name: name!,
      email: email!,
      createAt: new Date(createdAt!),
    }
  }

  loadUser(): void {
    this.userForm.patchValue({
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      createdAt: this.data.createAt.toDateString(),
    });
  }
}
