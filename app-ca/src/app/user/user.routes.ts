import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/components/user-list/user-list.component')
      .then(m => m.UserListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./presentation/components/add-user/add-user.component')
      .then(m => m.AddUserComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./presentation/components/edit-user/edit-user.component')
      .then(m => m.EditUserComponent)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
]
