import { TestBed, waitForAsync } from '@angular/core/testing'

import { AppComponent } from './app.component'

import { MockComponents } from 'ng-mocks'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ...MockComponents(CurrentWeatherComponent)],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('LocalCast Weather')
  })
})