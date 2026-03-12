import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IptvLayout } from './iptv-layout';

describe('IptvLayout', () => {
  let component: IptvLayout;
  let fixture: ComponentFixture<IptvLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IptvLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(IptvLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
