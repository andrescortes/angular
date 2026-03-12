import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesSidebar } from './countries-sidebar';

describe('CountriesSidebar', () => {
  let component: CountriesSidebar;
  let fixture: ComponentFixture<CountriesSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
