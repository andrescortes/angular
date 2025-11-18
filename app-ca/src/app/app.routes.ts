import { Routes } from '@angular/router';
import { LayoutComponent } from './core/presentation/layout/layout.component';
import { USER_ROUTES } from './user/user.routes';

export const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        children: USER_ROUTES
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ],
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
