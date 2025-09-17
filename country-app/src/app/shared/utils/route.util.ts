export enum ERoutes {
	// root
	HOME = 'home',
	COUNTRY = 'country',
	WILDCARD = '**',

	//child
	BASE_PATH = '',
	BY_CAPITAL = 'by-capital',
	BY_COUNTRY = 'by-country',
	BY_REGION = 'by-region',
	BY = 'by/:country',
}