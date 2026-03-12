import { Routes } from '@angular/router';
import { IptvLayout } from './core/layout/iptv-layout/iptv-layout';

export const routes: Routes = [
  {
    path: '',
    component: IptvLayout,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
