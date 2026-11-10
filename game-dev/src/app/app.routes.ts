import { Routes } from '@angular/router';
import { babylonRoutes } from './features/babylon/babylon.routes';

export const routes: Routes = [
  {
    path: 'babylon',
    loadChildren: () => import('./features/babylon/babylon.routes').then(m => m.babylonRoutes)
  },
  {
    path: '**',
    redirectTo: 'babylon',
  }
];
