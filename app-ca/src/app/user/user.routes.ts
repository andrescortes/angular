import { Routes } from "@angular/router";
import { UserHomeComponent } from "./presentation/pages/user-home/user-home.component";
import { UserListComponent } from "./presentation/components/user-list/user-list.component";

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
]
