import { ICountryDto } from "@country/country-res.interface";
import { ICountry } from "@country/country.interface";

export class CountryMapper {
    static toEntities(dtos: ICountryDto[]): ICountry[] {
        return dtos.map(dto => this.toEntity(dto));
    }

    static toEntity(dto: ICountryDto): ICountry {
        const countryName = `${dto.translations[ 'ara' ]?.common?.substring(0, 3) ?? dto.name.common}, ${dto.name.common}`
        const img = dto.coatOfArms?.png || dto.flags?.svg || dto.flags?.png;
        return {
            capital: dto?.capital ? dto.capital[ 0 ] : 'No Capital',
            name: countryName,
            population: dto.population,
            flag: dto.flag,
            flags: dto.flags,
            translations: dto.translations,
            region: dto.region,
            subregion: dto.subregion,
            cca2: dto.cca2,
            coatOfArms: img
        };
    }
}