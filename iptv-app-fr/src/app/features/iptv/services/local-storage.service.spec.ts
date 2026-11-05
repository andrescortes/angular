import { TestBed } from '@angular/core/testing';

import { IChannel, IChannelGroup } from '../../../core/interfaces';
import {
  getFromLocalStorage,
  GROUP_STORAGE_KEY,
  LocalStorageService,
} from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const mockChannel: IChannel = {
    id: 'ch-1',
    name: 'TV Publico',
    url: 'https://stream.example.com/tv-publico.m3u8',
    groupTitle: 'Argentina',
    logo: 'https://cdn.example.com/logos/tv-publico.png',
    country: 'AR',
    tvgId: 'tvpublico.ar',
  };

  const mockGroups: IChannelGroup[] = [
    { name: 'Argentina', channelsCount: 1, channels: [mockChannel] },
    { name: 'Spain', channelsCount: 0, channels: [] },
  ];

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setChannelGroups', () => {
    it('should persist groups under the "groups" key as JSON', () => {
      service.setChannelGroups(mockGroups);

      const raw = localStorage.getItem(GROUP_STORAGE_KEY);
      expect(raw).toBe(JSON.stringify(mockGroups));
      expect(GROUP_STORAGE_KEY).toBe('groups');
    });

    it('should overwrite previously stored groups', () => {
      service.setChannelGroups(mockGroups);
      service.setChannelGroups([mockGroups[0]]);

      expect(service.getChannelGroups()).toHaveLength(1);
    });

    it('should store an empty array without throwing', () => {
      expect(() => service.setChannelGroups([])).not.toThrow();
      expect(service.getChannelGroups()).toEqual([]);
    });
  });

  describe('getChannelGroups', () => {
    it('should return an empty array when nothing is stored', () => {
      expect(service.getChannelGroups()).toEqual([]);
    });

    it('should return the stored groups', () => {
      service.setChannelGroups(mockGroups);

      const result = service.getChannelGroups();
      expect(result).toEqual(mockGroups);
      expect(result[0].channels[0].name).toBe('TV Publico');
    });

    it('should return the default value when the stored JSON is corrupted', () => {
      localStorage.setItem(GROUP_STORAGE_KEY, '{ not valid json');

      expect(service.getChannelGroups()).toEqual([]);
    });

    it('should return a new parsed object, not a shared reference', () => {
      service.setChannelGroups(mockGroups);

      const first = service.getChannelGroups();
      const second = service.getChannelGroups();

      expect(first).toEqual(second);
      expect(first).not.toBe(second);
    });
  });

  describe('getFromLocalStorage', () => {
    it('should parse a stored value of type T', () => {
      localStorage.setItem('counter', JSON.stringify(42));
      expect(getFromLocalStorage<number>('counter', 0)).toBe(42);
    });

    it('should return the default value for a missing key', () => {
      expect(getFromLocalStorage<string>('missing', 'fallback')).toBe('fallback');
    });

    it('should return the default value for malformed JSON', () => {
      localStorage.setItem('bad', 'nope[');
      expect(getFromLocalStorage<string[]>('bad', [])).toEqual([]);
    });

    it('should preserve falsy stored values instead of falling back', () => {
      localStorage.setItem('flag', JSON.stringify(false));
      expect(getFromLocalStorage<boolean>('flag', true)).toBe(false);
    });
  });
});
