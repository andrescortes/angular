import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteChannel } from './autocomplete-channel';

describe('AutocompleteChannel', () => {
  let component: AutocompleteChannel;
  let fixture: ComponentFixture<AutocompleteChannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteChannel],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteChannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
