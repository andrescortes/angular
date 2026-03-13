import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChannelGroupStore } from '@store/iptv';

export interface StateGroup {
  country: string;
  channels: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-autocomplete-channel',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './autocomplete-channel.html',
  styleUrl: './autocomplete-channel.css',
})
export class AutocompleteChannel {
  private readonly store = inject(ChannelGroupStore);
  private readonly _formBuilder = inject(FormBuilder);

  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: Signal<StateGroup[]> = computed(() => {
    console.log('groups changing');

    const groups = this.store.groups().map(g => {
      const state: StateGroup = {
        country: g.name,
        channels: g.channels.map(c => c.name)
      }
      return state;
    })
    return groups;
  });
  stateGroupOptions?: Observable<StateGroup[]>;

  constructor() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(''),
        map(value => this._filterGroup(value || '')),
      );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      console.log('name', value);
      this.store.setChannelByName(value);
      this.stateForm.controls.stateGroup.setValue('');
      this.stateForm.controls.stateGroup.reset();
      return this.stateGroups()
        .map(group => ({ country: group.country, channels: _filter(group.channels, value) }))
        .filter(group => group.channels.length > 0);
    }

    return this.stateGroups();
  }
}
