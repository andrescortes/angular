import { MatDialog } from '@angular/material/dialog';

export const MAT_DIALOG_MOCK = jasmine.createSpyObj<MatDialog>(
  'MatDialog',
  ['open',],
  {},
);
