import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExachangeRatesComponent } from './exachange-rates.component';

describe('ExachangeRatesComponent', () => {
  let component: ExachangeRatesComponent;
  let fixture: ComponentFixture<ExachangeRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExachangeRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExachangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
