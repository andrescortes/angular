import { Component, inject, input, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { IChannel } from '@core/interfaces';
import { ChannelStore } from '@store/iptv/channel.store';
import { ChannelPlayer } from '../channel-player/channel-player';

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
export class ChannelsGrid {
  private retryCounter = signal(0);
  readonly store = inject(ChannelStore);

  channels = input<IChannel[]>([]);
  errorMessage = signal<string | null>(null);
  retryToken = this.retryCounter.asReadonly();

  error(message: string): void {
    this.errorMessage.set(message);
  }

  onPlaying(): void {
    this.errorMessage.set(null);
  }

  retry(): void {
    this.errorMessage.set(null);
    this.retryCounter.update(n => n + 1);
  }
}
