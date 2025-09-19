export interface ICountry {
    capital: string;
    name: string;
    population: number;
    flag: string;
    cca2: string;
    flags: IFlag;
    translations: ITranslation;
    region: string;
    subregion: string;
    coatOfArms: string;
}

export interface IFlag {
    alt: string;
    svg: string;
}

export interface ICountrySpec {
    common: string;
    official: string;
}

export interface ITranslation {
    [key: string]: ICountrySpec;
}