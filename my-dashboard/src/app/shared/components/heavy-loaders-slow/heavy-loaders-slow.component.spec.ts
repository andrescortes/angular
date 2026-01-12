import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyLoadersSlowComponent } from './heavy-loaders-slow.component';

describe('HeavyLoadersSlowComponent', () => {
  let component: HeavyLoadersSlowComponent;
  let fixture: ComponentFixture<HeavyLoadersSlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeavyLoadersSlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeavyLoadersSlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
