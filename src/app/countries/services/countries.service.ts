import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'

  // se asigna por medio de guion bajo a la region para que no sea modificable para el usuario las cuales ya deben de estar creaadas en una interfas para poder hacer mach
  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(private http: HttpClient) { }

  //Aqui desestructuramos la variable dentro de un metodo get para poder obetner la informacion retornando dentro de corchetes y 3 puntos suspensiovos para poder acceder a la información
  get regions(): Region[] {
    // A lo que esta dentro de los corchetes se le conoce como operador spread el cual sirve para poder asignarlo a una variable constante o función
    return [... this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {

    if (!region) {
      return of([]);
    }

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          //Los signos de interrogacion se llaman signos de cobalencia nula
          borders: country.borders ?? []
        }))),

      )
      ;
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url)
      .pipe(
        map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {

    if (!borders || borders.length === 0) {
      return of([]);
    }

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    })
    //combineLatest() Combina múltiples Observables para crear un Observable cuyos valores se calculan a partir de los últimos valores de cada uno de sus Observables de entrada. En pocas palabras dispara simultaneamente los subscribes de la peticion.
    return combineLatest(countriesRequest);

  }

}
