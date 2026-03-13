import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IChannel } from '@core/interfaces';
import { ChannelGroupStore } from '@store/iptv';

import Hls, { ErrorData } from 'hls.js';

@Component({
  selector: 'app-channel-player',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './channel-player.html',
  styleUrl: './channel-player.css',
})
export class ChannelPlayer implements OnInit, AfterViewInit, OnChanges {
  channel = input<IChannel>();

  @ViewChild('video', { static: false })
  videoElement?: ElementRef<HTMLVideoElement>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly groupStore = inject(ChannelGroupStore);
  private hls: Hls | null = null;

  errorMessage = signal<string | null>(null);
  channelName = computed(() => this.channel()?.name ?? 'Loading channel…');

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyPlayer();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initPlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);

    if (!changes[ 'channel' ].isFirstChange()) {
      this.destroyPlayer();
      this.initPlayer();
    }
  }

  initPlayer(): void {
    const channel = this.channel();
    const videoEl = this.videoElement?.nativeElement;
    if (!channel?.url || !videoEl) {
      this.errorMessage.set('No stream URL available for this channel.');
      return;
    }
    if (Hls.isSupported()) {
      this.hls = new Hls({
        enableWorker: true,
      });
      this.hls.loadSource(channel.url);
      this.hls.attachMedia(videoEl);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.muted = true;
        videoEl?.play().then(() => {
          videoEl.pause();
        })
          .catch(() => {
            console.log('Deleting channel with name', channel.name);
            this.groupStore.removeChannel(channel.id);
            this.groupStore.removeGroupChannel(channel.groupTitle, channel.id);
          }
          );
      });

      this.hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && data.fatal) {
          console.log('Deleting channel with name', channel.name);
          this.groupStore.removeChannel(channel.id);
          this.groupStore.removeGroupChannel(channel.groupTitle, channel.id);
        }
        this.destroyPlayer();
      });

    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = channel.url;

      videoEl.play().then(() => {
        videoEl.muted = true;
        videoEl.pause();
      })
        .catch(() => {
          console.log('Deleting channel with name', channel.name);
          this.groupStore.removeChannel(channel.id);
          this.groupStore.removeGroupChannel(channel.groupTitle, channel.id);
        });

      videoEl.addEventListener('error', () => {
        this.errorMessage.set('An error occurred while loading the stream.');
        console.log('Deleting channel with name', channel.name);
        this.groupStore.removeChannel(channel.id);
        this.groupStore.removeGroupChannel(channel.groupTitle, channel.id);
      });
    } else {
      this.errorMessage.set('HLS is not supported in this browser.');
    }
  }

  private destroyPlayer(): void {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
  }

  setupError(data: ErrorData): void {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          this.errorMessage.set('Channel unavailable (network error / 403 / 404).');
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          this.errorMessage.set('Media error while playing this channel.');
          this.hls?.recoverMediaError();
          return;
        default:
          this.errorMessage.set('Fatal error while playing this channel.');
      }
      this.hls?.destroy();
    }
  }
}
