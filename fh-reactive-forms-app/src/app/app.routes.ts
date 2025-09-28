import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'reactive',
        loadChildren: () => import('./forms/reactive/reactive.routes').then(m => m.reactiveRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./forms/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'country',
        loadChildren: () => import('./forms/country/country.routes').then(m => m.countryRoutes)
    },
    {
        path: '**',
        redirectTo: 'reactive'
    }
];
