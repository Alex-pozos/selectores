import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public coutriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountrychanged();
  }

  //Este metodo viene del servicio para poder inyectar la informacion nuesrto html
  get regions(): Region[] {
    return this.countriesService.regions;
  }

  //Con este metodo vamos a evaluar la opcion que el usuaio selecciono para poder mandar la al meotodo ngOnInit()
  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      // el pipe se usa para devolver un valor de nuestra peticion de region
      .pipe(
        //el tap() sirve para modificar un dato o parametro antes de que se haga la peticion de switchMap()
        tap(() => this.myForm.get('country')?.setValue('')),
        //switchMap(); Proyecta cada valor de fuente a un Observable que se fusiona en el Observable de salida, emitiendo valores solo del Observable proyectado más recientemente.
        tap(() => this.borders = []),
        switchMap(region => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(countries => {
        this.coutriesByRegion = countries;
      })
  }

  onCountrychanged(): void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)),
        switchMap((country) => this.countriesService.getCountryBordersByCodes(country.borders)),
      )
      .subscribe(countries => {

        this.borders = countries;

      });
  }

}
