import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Channel } from '../../../../core/interfaces/Channel.interface';
import { ChannelPlayer } from '../channel-player/channel-player';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChannelStore } from '../../../../store/iptv/channel.store';

@Component({
  selector: 'app-channels-grid',
  imports: [ CommonModule, MatCardModule, MatIconModule, ChannelPlayer, MatProgressSpinnerModule ],
  templateUrl: './channels-grid.html',
  styleUrl: './channels-grid.css',
})
export class ChannelsGrid {
  readonly store = inject(ChannelStore);
  channels = input<Channel[]>([]);
  errorMessage = signal<string | null>(null);
  private retryCounter = signal(0);
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
