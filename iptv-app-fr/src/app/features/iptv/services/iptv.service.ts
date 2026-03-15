import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { ChannelRequest } from '../interfaces/requests';
import { environment } from '../../../../environments/environment.development';
import { IChannel, IChannelGroup } from '../../../core/interfaces';

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
