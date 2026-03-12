import { Component, inject, OnInit } from '@angular/core';
import { CountriesSidebar } from '../../components/countries-sidebar/countries-sidebar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Header } from "../../components/header/header";
import { ChannelsGrid } from '../../../features/iptv/components/channels-grid/channels-grid';
import { Channel } from '../../interfaces/Channel.interface';
import { ChannelStore } from '../../../store/iptv/channel.store';

@Component({
  selector: 'app-iptv-layout',
  imports: [ ChannelsGrid, CountriesSidebar, MatToolbarModule, Header ],
  templateUrl: './iptv-layout.html',
  styleUrl: './iptv-layout.css',
})
export class IptvLayout implements OnInit {
  readonly store = inject(ChannelStore);
  selectedChannels: Channel[] = [];

  ngOnInit(): void {
  }
  onChannelSelected($event: Event) {
  }
}
