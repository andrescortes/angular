import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsGrid } from './channels-grid';

describe('ChannelsGrid', () => {
  let component: ChannelsGrid;
  let fixture: ComponentFixture<ChannelsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
