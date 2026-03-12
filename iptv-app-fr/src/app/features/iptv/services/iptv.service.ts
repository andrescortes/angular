import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../../../core/interfaces/Channel.interface';
import { environment } from '../../../../environments/environment';
import { ChannelRequest } from '../interfaces/requests/channel.request';

@Injectable({
  providedIn: 'root',
})
export class IptvService {
  private readonly client = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getChannels(): Observable<Channel[]> {
    const request: ChannelRequest = {
      name: '',
      group: 'Argentina',
      page: 1,
      size: 30,
    }
    return this.client.post<Channel[]>(`${this.apiUrl}/channels`, request);
  }
}
