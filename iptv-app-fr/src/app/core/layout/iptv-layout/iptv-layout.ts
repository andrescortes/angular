import { Component, inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { ChannelsGrid } from '@features/iptv/components/channels-grid/channels-grid';
import { ChannelStore } from '@store/iptv/channel.store';
import { CountriesSidebar } from '@core/components/countries-sidebar/countries-sidebar';
import { Header } from '@core/components/header/header';


@Component({
  selector: 'app-iptv-layout',
  imports: [
    MatToolbarModule,
    ChannelsGrid,
    CountriesSidebar,
    Header
  ],
  templateUrl: './iptv-layout.html',
  styleUrl: './iptv-layout.css',
})
export class IptvLayout {
  readonly store = inject(ChannelStore);
}
