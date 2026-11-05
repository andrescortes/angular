import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IChannel, IChannelGroup } from '../../../core/interfaces';
import { environment } from '../../../../environments/environment.development';
import { IptvService } from './iptv.service';

describe('IptvService', () => {
  let service: IptvService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  const mockChannel: IChannel = {
    id: 'ch-1',
    name: 'TV Publico',
    url: 'https://stream.example.com/tv-publico.m3u8',
    groupTitle: 'Argentina',
    logo: 'https://cdn.example.com/logos/tv-publico.png',
    country: 'AR',
    tvgId: 'tvpublico.ar',
  };

  const mockGroup: IChannelGroup = {
    name: 'Argentina',
    channelsCount: 1,
    channels: [mockChannel],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IptvService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(IptvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChannels', () => {
    it('should POST to /channels and return the channel list', () => {
      let result: IChannel[] | undefined;

      service.getChannels().subscribe((channels) => (result = channels));

      const req = httpMock.expectOne(`${apiUrl}/channels`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        name: '',
        group: 'Argentina',
        page: 1,
        size: 1,
      });

      req.flush([mockChannel]);

      expect(result).toEqual([mockChannel]);
    });

    it('should return an empty array when the backend has no channels', () => {
      let result: IChannel[] | undefined;

      service.getChannels().subscribe((channels) => (result = channels));

      httpMock.expectOne(`${apiUrl}/channels`).flush([]);

      expect(result).toEqual([]);
    });

    it('should propagate HTTP errors to the caller', () => {
      let errorStatus = 0;

      service.getChannels().subscribe({
        next: () => {
          throw new Error('should not emit on error');
        },
        error: (err: HttpErrorResponse) => (errorStatus = err.status),
      });

      const req = httpMock.expectOne(`${apiUrl}/channels`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });

      expect(errorStatus).toBe(500);
    });
  });

  describe('getChannelGroups', () => {
    it('should GET /channel-groups and return the group list', () => {
      let result: IChannelGroup[] | undefined;

      service.getChannelGroups().subscribe((groups) => (result = groups));

      const req = httpMock.expectOne(`${apiUrl}/channel-groups`);
      expect(req.request.method).toBe('GET');

      req.flush([mockGroup]);

      expect(result).toEqual([mockGroup]);
      expect(result?.[0].channels).toHaveLength(1);
    });

    it('should return an empty array when the backend has no groups', () => {
      let result: IChannelGroup[] | undefined;

      service.getChannelGroups().subscribe((groups) => (result = groups));

      httpMock.expectOne(`${apiUrl}/channel-groups`).flush([]);

      expect(result).toEqual([]);
    });

    it('should propagate HTTP errors to the caller', () => {
      let errorStatus = 0;

      service.getChannelGroups().subscribe({
        next: () => {
          throw new Error('should not emit on error');
        },
        error: (err: HttpErrorResponse) => (errorStatus = err.status),
      });

      httpMock
        .expectOne(`${apiUrl}/channel-groups`)
        .flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(errorStatus).toBe(404);
    });
  });
});
