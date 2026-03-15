import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChannelGroupStore } from '../../../store/iptv';

@Component({
  selector: 'app-countries-sidebar',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './countries-sidebar.html',
  styleUrl: './countries-sidebar.css',
})
export class CountriesSidebar {
  private readonly groupStore = inject(ChannelGroupStore);
  readonly panelOpenState = signal(false);

  groups = this.groupStore.allGroups;
  channels = this.groupStore.allChannels;

  countChannels = computed(() => this.groups().flatMap(g => g.channels).length);
  channelNames = computed(() => this.channels().map(c => c.name));
  countries = computed(() => {
    return this.groups().map(g => g.name
      ? { name: g.name, count: g.channelsCount }
      : { name: 'Unknown', count: g.channelsCount }
    )
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  loadChannelByCountry(countryName: string): void {
    this.groupStore.setGroupByName(countryName.trim());
  }

  loadChannelByName(channelName: string): void {
    this.groupStore.setChannelByName(channelName.trim());
  }
}
