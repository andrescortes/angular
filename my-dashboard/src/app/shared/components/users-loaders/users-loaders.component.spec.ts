import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoadersComponent } from './users-loaders.component';

describe('UsersLoadersComponent', () => {
  let component: UsersLoadersComponent;
  let fixture: ComponentFixture<UsersLoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersLoadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
