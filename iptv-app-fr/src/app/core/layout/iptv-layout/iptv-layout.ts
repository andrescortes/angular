import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { CountriesSidebar } from '@core/components/countries-sidebar/countries-sidebar';
import { Header } from '@core/components/header/header';
import { ChannelsGrid } from '@features/iptv/components/channels-grid/channels-grid';


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
}
