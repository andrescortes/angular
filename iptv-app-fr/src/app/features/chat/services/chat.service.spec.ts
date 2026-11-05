import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IChat } from '../../../core/interfaces/chat.interface';
import { environment } from '../../../../environments/environment.development';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  const mockChat: IChat = {
    id: 'msg-1',
    sender: 'andres',
    message: 'Buenas noches desde Argentina!',
    createdAt: '2026-11-05T20:15:00.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHistory', () => {
    it('should GET /chat/history and return the chat list', () => {
      let result: IChat[] | undefined;

      service.getHistory().subscribe((chats) => (result = chats));

      const req = httpMock.expectOne(`${apiUrl}/chat/history`);
      expect(req.request.method).toBe('GET');

      req.flush([mockChat]);

      expect(result).toEqual([mockChat]);
      expect(result?.[0].sender).toBe('andres');
    });

    it('should return an empty array when there is no history', () => {
      let result: IChat[] | undefined;

      service.getHistory().subscribe((chats) => (result = chats));

      httpMock.expectOne(`${apiUrl}/chat/history`).flush([]);

      expect(result).toEqual([]);
    });

    it('should not send extra params or body on the request', () => {
      service.getHistory().subscribe();

      const req = httpMock.expectOne(`${apiUrl}/chat/history`);
      expect(req.request.params.keys().length).toBe(0);
      expect(req.request.body).toBeNull();
    });

    it('should propagate HTTP errors to the caller', () => {
      let errorStatus = 0;

      service.getHistory().subscribe({
        next: () => {
          throw new Error('should not emit on error');
        },
        error: (err: HttpErrorResponse) => (errorStatus = err.status),
      });

      httpMock
        .expectOne(`${apiUrl}/chat/history`)
        .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(errorStatus).toBe(401);
    });

    it('should emit one value and complete', () => {
      const next = vi.fn();
      const complete = vi.fn();

      service.getHistory().subscribe({ next, complete });

      httpMock.expectOne(`${apiUrl}/chat/history`).flush([mockChat]);

      expect(next).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });
});
