import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, filter, tap } from 'rxjs/operators'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent {
  // implements OnInit { // Imperative-style
  // @Output() searchEvent = new EventEmitter<string>() // Alternate event-based implementation

  search = new FormControl('', [Validators.required, Validators.minLength(2)])
  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        takeUntilDestroyed(),
        filter(() => this.search.valid),
        debounceTime(1000),
        tap((searchValue) => this.doSearch(searchValue))
      )
      .subscribe()
  }

  // // Imperative-style
  // ngOnInit(): void {
  //   this.search.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
  //     if (!this.search.invalid) {
  //       // this.searchEvent.emit(searchValue) // Alternate event-based implementation
  //       const userInput = searchValue.split(',').map((s) => s.trim())
  //       this.weatherService.updateCurrentWeather(
  //         userInput[0],
  //         userInput.length > 1 ? userInput[1] : undefined
  //       )
  //     }
  //   })
  // }

  doSearch(searchValue: string | null) {
    if (searchValue === null) return
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }
}