import { Routes } from "@angular/router";

import { ByCapitalPageComponent } from "@country/by-capital-page/by-capital-page.component";
import { ByCountryPageComponent } from "@country/by-country-page/by-country-page.component";
import { ByRegionPageComponent } from "@country/by-region-page/by-region-page.component";
import { CountryLayoutComponent } from "@country/country-layout/country-layout.component";
import { CountryPageComponent } from "@country/country-page/country-page.component";
import { ERoutes } from "@shared/utils/route.util";

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
				path: ERoutes.BY_COUNTRY,
				component: ByCountryPageComponent
			},
			{
				path: ERoutes.BY_REGION,
				component: ByRegionPageComponent
			},
			{
				path: ERoutes.BY,
				component: CountryPageComponent
			},
			{
				path: ERoutes.WILDCARD,
				redirectTo: ERoutes.BY_CAPITAL
			}
		]
	}
];

export default countryRoutes;