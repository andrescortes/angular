import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFront } from './navbar-front';
import { provideRouter } from '@angular/router';

describe('NavbarFront', () => {
  let component: NavbarFront;
  let fixture: ComponentFixture<NavbarFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFront],
      providers: [
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarFront);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
