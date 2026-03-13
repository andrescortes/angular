import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IChannel, IChannelGroup } from '@core/interfaces';
import { environment } from '@env/environment.development';
import { ChannelRequest } from '../interfaces/requests';

@Injectable({
  providedIn: 'root',
})
export class IptvService {
  private readonly client = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getChannels(): Observable<IChannel[]> {
    const request: ChannelRequest = {
      name: '',
      group: 'Argentina',
      page: 1,
      size: 1,
    }
    return this.client.post<IChannel[]>(`${this.apiUrl}/channels`, request);
  }

  getChannelGroups(): Observable<IChannelGroup[]> {
    return this.client.get<IChannelGroup[]>(`${this.apiUrl}/channel-groups`);
  }
}
