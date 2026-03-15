import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";

import { IChannelGroup } from "../../core/interfaces";
import { IptvService } from "../../features/iptv/services/iptv.service";
import { LocalStorageService } from "../../features/iptv/services/local-storage.service";
import { withLogger } from "../common";
import { initialChannelGroupState } from "./state";


export const ChannelGroupStore = signalStore(
  { providedIn: 'root' },
  withState(initialChannelGroupState),
  withLogger('ChannelGroupStore'),
  withComputed((state) => ({
    allGroups: computed(() => state.groups()),
    allChannels: computed(() => state.channels()),
    getGroupSelected: computed(() => {
      return state.selectedGroupName()
        ? state.groups().find((group) => group.name === state.selectedGroupName())?.channels
        : null;
    }),
    getChannelSelected: computed(() => {
      return state.selectedChannel()
        ? state.channels().find((c) => c.name === state.selectedChannel()) ?? null
        : null;
    }),
  })),
  withMethods((store, iptvService = inject(IptvService), localStorageService = inject(LocalStorageService)) => ({
    loadChannelGroups: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { groups: [], channels: [], isLoading: true, error: null })),
        switchMap(() => {
          return iptvService.getChannelGroups()
            .pipe(
              tapResponse({
                next: (groups) => {
                  patchState(store, {
                    groups,
                    channels: groups.flatMap(g => g.channels),
                    isLoading: false
                  })
                },
                error(err) {
                  const message = err instanceof HttpErrorResponse
                    || err instanceof Error
                    ? err.message
                    : 'Something went wrong';
                  patchState(store, { error: message })
                },
                finalize: () => patchState(store, { isLoading: false })
              })
            )
        })
      )
    ),
    setGroupByName(name: string): void {
      patchState(store, { selectedGroupName: name, selectedChannel: null });
    },
    setChannelByName(channelName: string): void {
      patchState(store, { selectedChannel: channelName, selectedGroupName: null });
    },
    removeChannel(id: string): void {
      patchState(store, (state) => ({
        channels: state.channels.filter(c => c.id !== id),
      }))
    },
    removeGroupChannel(groupTitle: string, channelId: string): void {
      const groups: IChannelGroup[] = store.groups().map(g => {
        if (g.name === groupTitle) {
          return {
            channels: g.channels.filter(c => c.id !== channelId),
            name: g.name,
            channelsCount: g.channels.length - 1
          }
        }
        return g;
      })
        .filter(g => g.channelsCount > 0);
      localStorageService.setChannelGroups(groups);
      patchState(store, { groups });
    },
    setGroups(groups: IChannelGroup[]): void {
      patchState(store, { groups, channels: groups.flatMap(g => g.channels) });
    }
  })),
  // withHooks({
  //   onInit(store) {
  //     store.loadChannelGroups();
  //   },
  // })
);
