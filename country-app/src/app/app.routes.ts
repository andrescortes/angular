import { Routes } from '@angular/router';

import { HomePageComponent } from '@shared/pages/home-page/home-page.component';
import { ERoutes } from '@shared/utils/route.util';

export const routes: Routes = [
    {
        path: ERoutes.HOME,
        component: HomePageComponent
    },
    {
        path: ERoutes.COUNTRY,
        loadChildren: () => import('@country/country.route')//.then(c => c.countryRoutes)
    },
    {
        path: ERoutes.WILDCARD,
        redirectTo: ERoutes.HOME
    }
];
