import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/pages/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'change-detection',
        loadComponent: () =>
          import(
            './dashboard/pages/change-detection/change-detection.component'
          ).then((m) => m.ChangeDetectionComponent),
      },
      {
        path: 'control-flow',
        loadComponent: () =>
          import('./dashboard/pages/control-flow/control-flow.component').then(
            (m) => m.ControlFlowComponent
          ),
      },
      {
        path: 'control-flow',
        loadComponent: () =>
          import('./dashboard/pages/control-flow/control-flow.component').then(
            (m) => m.ControlFlowComponent
          ),
      },
      {
        path: 'defer-views',
        loadComponent: () =>
          import('./dashboard/pages/defer-views/defer-views.component').then(
            (m) => m.DeferViewsComponent
          ),
      },
      {
        path: 'defer-options',
        loadComponent: () =>
          import(
            './dashboard/pages/defer-options/defer-options.component'
          ).then((m) => m.DeferOptionsComponent),
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./dashboard/pages/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./dashboard/pages/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'view-transition',
        loadComponent: () =>
          import(
            './dashboard/pages/view-transition/view-transition.component'
          ).then((m) => m.ViewTransitionComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
