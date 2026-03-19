import { Component, signal } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ChannelsGrid } from '../../../features/iptv/components/channels-grid/channels-grid';
import { CountriesSidebar } from '../../components/countries-sidebar/countries-sidebar';
import { Header } from '../../components/header/header';
import { MatButtonModule } from '@angular/material/button';
import { Chat } from '../../../features/chat/components/chat/chat';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-iptv-layout',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    ChannelsGrid,
    CountriesSidebar,
    Header,
    Chat
  ],
  templateUrl: './iptv-layout.html',
  styleUrl: './iptv-layout.css',
})
export class IptvLayout {
  isChat = signal<boolean>(false);

  showChat(): void {
    this.isChat.set(!this.isChat());
  }
}
