import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { firstValueFrom } from "rxjs";
import { computed, inject } from "@angular/core";

import { initialChannelState } from "./state/channel.state";
import { withLogger } from "../common/with-logger";
import { setError, setFulfilled, setPending, withRequestStatus } from "../common/with-request-status";
import { IptvService } from "../../features/iptv/services/iptv.service";
import { Channel } from "../../core/interfaces/Channel.interface";

export const ChannelStore = signalStore(
  { providedIn: 'root' },
  withState(initialChannelState),
  withRequestStatus(),
  withLogger('ChannelStore'),
  withMethods((store, iptvService = inject(IptvService)) => ({
    async fetchChannels(): Promise<void> {
      patchState(store, setPending());
      try {
        const channels = await firstValueFrom(iptvService.getChannels());
        patchState(store, (state) => ({
           channels: [...state.channels, ...channels],
          ...setFulfilled(),
        }));
      } catch (error: unknown) {
        patchState(store, setError((error as Error).message));
      }
    },
    removeChannel(channelId: string): void {
      patchState(store, (state) => ({
        channels: state.channels.filter(channel => channel.id !== channelId),
      }));
    },
    addAllChannels(channels: Channel[]): void {
      patchState(store, (state) => ({
        channels: [...state.channels, ...channels],
      }));
    }
  })),

  withHooks({
    onInit(store) {
      store.fetchChannels();
    },
  })
);
