import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyLoadersFastComponent } from './heavy-loaders-fast.component';

describe('HeavyLoadersFastComponent', () => {
  let component: HeavyLoadersFastComponent;
  let fixture: ComponentFixture<HeavyLoadersFastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeavyLoadersFastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeavyLoadersFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
