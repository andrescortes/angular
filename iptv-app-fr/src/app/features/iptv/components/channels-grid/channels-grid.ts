import { Component, computed, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ChannelPlayer } from '../channel-player/channel-player';
import { ChannelGroupStore } from '../../../../store/iptv';
import { LocalStorageService } from '../../services/local-storage.service';

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
    if (groups.length) {
      this.store.setGroups(groups);
    } else {
      this.store.loadChannelGroups();
    }
  }
}
