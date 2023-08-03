import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationGdpComponent } from './population-gdp.component';

describe('PopulationGdpComponent', () => {
  let component: PopulationGdpComponent;
  let fixture: ComponentFixture<PopulationGdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationGdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationGdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
