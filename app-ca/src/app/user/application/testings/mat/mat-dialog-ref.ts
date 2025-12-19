import { MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from '../../../presentation/components/edit-user/edit-user.component';

export const MAT_DIALOG_REF_MOCK = jasmine.createSpyObj<
  MatDialogRef<EditUserComponent>
>('MatDialogRef', ['afterClosed', 'close'], {});
