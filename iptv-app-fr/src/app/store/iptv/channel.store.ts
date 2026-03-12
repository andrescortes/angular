import { inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { firstValueFrom } from "rxjs";

import { IChannel } from "@core/interfaces";
import { IptvService } from "@features/iptv/services/iptv.service";
import { withLogger } from "@store/common/with-logger";
import { withRequestStatus, setPending, setFulfilled, setError } from "@store/common/with-request-status";
import { initialChannelState } from "./state/channel.state";

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
    addAllChannels(channels: IChannel[]): void {
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
