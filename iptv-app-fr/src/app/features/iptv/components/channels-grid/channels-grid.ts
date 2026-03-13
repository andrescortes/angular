import { Component, computed, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ChannelGroupStore } from '@store/iptv';
import { ChannelPlayer } from '../channel-player/channel-player';
import { LocalStorageService } from '@features/iptv/services/local-storage.service';

@Component({
  selector: 'app-channels-grid',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ChannelPlayer
  ],
  templateUrl: './channels-grid.html',
  styleUrl: './channels-grid.css',
})
export class ChannelsGrid implements OnInit {
  readonly store = inject(ChannelGroupStore);
  private readonly localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    const groups = this.localStorage.getChannelGroups();
    console.log('groups: ', groups);

    if (groups.length) {
      this.store.setGroups(groups);
    } else {
      console.log('Calling service groups');
      this.store.loadChannelGroups();
    }
  }
}
