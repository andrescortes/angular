import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IChat } from '../../../core/interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly httpClient = inject(HttpClient);
  private readonly URL_BASE = environment.apiUrl;

  getHistory(): Observable<IChat[]> {
    return this.httpClient.get<IChat[]>(`${this.URL_BASE}/chat/history`);
  }
}
