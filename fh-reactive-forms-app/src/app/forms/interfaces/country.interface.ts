export interface ICountry {
  name: IName;
  cca3: string;
  borders: string[];
}

export interface IName {
  common: string;
  official: string;
  nativeName: { [key: string]: INativeName };
}

export interface INativeName {
  official: string;
  common: string;
}
