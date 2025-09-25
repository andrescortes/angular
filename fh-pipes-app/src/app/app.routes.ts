import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Basic pipes',
        loadComponent: () => import('@pipes/pages/basic-page/basic-page.component').then(m => m.BasicPageComponent)
    },
    {
        path: 'numbers',
        title: 'Numbers pipes',
        loadComponent: () => import('@pipes/pages/numbers-page/numbers-page.component').then(m => m.NumbersPageComponent)
    },
    {
        path: 'uncommon',
        title: 'Uncommon pipes',
        loadComponent: () => import('@pipes/pages/uncommon-page/uncommon-page.component').then(m => m.UncommonPageComponent)
    },
    {
        path: 'custom-pipes',
        title: 'Custom pipes',
        loadComponent: () => import('@pipes/pages/custom-page/custom-page.component').then(m => m.CustomPageComponent)
    },
    {
        path: '**',
        redirectTo: 'basic'
    }
];
