import { Routes } from "@angular/router";
import { ERoutes } from "@shared/utils/route.util";
import { CountryLayoutComponent } from "./layouts/country-layout/country-layout.component";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";

export const countryRoutes: Routes = [
    {
        path: ERoutes.BASE_PATH,
        component: CountryLayoutComponent,
        children: [
            {
                path: ERoutes.BY_CAPITAL,
                component: ByCapitalPageComponent
            },
            {
                path: ERoutes.WILDCARD,
                redirectTo: ERoutes.BY_CAPITAL
            }
        ]
    }
];

export default countryRoutes;