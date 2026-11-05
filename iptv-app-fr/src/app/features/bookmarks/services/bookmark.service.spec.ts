import { TestBed } from '@angular/core/testing';

import { Bookmark, CreateBookmarkDto } from '../models/bookmark.model';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;

  const STORAGE_KEY = 'signal_store_bookmarks';

  /** Advances the mocked timers past the longest simulated network delay. */
  const flushDelays = () => vi.advanceTimersByTime(1000);

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkService);
  });

  afterEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should seed initial bookmarks on first call and emit them', () => {
      let result: Bookmark[] | undefined;

      service.getAll().subscribe((list) => (result = list));
      flushDelays();

      expect(result).toBeDefined();
      expect(result!.length).toBeGreaterThan(0);
      expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
    });

    it('should return stored bookmarks instead of re-seeding', () => {
      const custom: Bookmark[] = [
        {
          id: 'x1',
          title: 'My Page',
          url: 'https://mine.example.com',
          category: 'General',
          isFavorite: false,
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));

      let result: Bookmark[] | undefined;
      service.getAll().subscribe((list) => (result = list));
      flushDelays();

      expect(result).toEqual(custom);
    });

    it('should fall back to seed data when stored JSON is corrupted', () => {
      localStorage.setItem(STORAGE_KEY, 'broken{');

      let result: Bookmark[] | undefined;
      service.getAll().subscribe((list) => (result = list));
      flushDelays();

      expect(result!.length).toBeGreaterThan(0);
      expect(result!.some((b) => b.title === 'Angular Documentation')).toBe(true);
    });

    it('should not emit synchronously because of the simulated delay', () => {
      let emitted = false;

      service.getAll().subscribe(() => (emitted = true));

      expect(emitted).toBe(false);
      flushDelays();
      expect(emitted).toBe(true);
    });
  });

  describe('create', () => {
    const dto: CreateBookmarkDto = {
      title: 'New Bookmark',
      url: 'https://new.example.com',
      category: 'Tools',
      isFavorite: true,
    };

    it('should create a bookmark with generated id and createdAt, and persist it first', () => {
      let created: Bookmark | undefined;

      service.create(dto).subscribe((b) => (created = b));
      flushDelays();

      expect(created).toBeDefined();
      expect(created!.id).toBeTruthy();
      expect(created!.createdAt).toBeTruthy();
      expect(created!.title).toBe('New Bookmark');

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Bookmark[];
      expect(stored[0].id).toBe(created!.id);
    });

    it('should default category to "General" when empty', () => {
      let created: Bookmark | undefined;

      service.create({ ...dto, category: '' }).subscribe((b) => (created = b));
      flushDelays();

      expect(created!.category).toBe('General');
    });

    it('should coerce a falsy isFavorite to false', () => {
      let created: Bookmark | undefined;

      service
        .create({ ...dto, isFavorite: undefined as unknown as boolean })
        .subscribe((b) => (created = b));
      flushDelays();

      expect(created!.isFavorite).toBe(false);
    });

    it('should error when title is blank', () => {
      let errorMessage = '';

      service.create({ ...dto, title: '   ' }).subscribe({
        next: () => {
          throw new Error('should not emit on error');
        },
        error: (err: Error) => (errorMessage = err.message),
      });

      expect(errorMessage).toBe('Title cannot be empty');
    });

    it('should not persist anything when the title is blank', () => {
      service.create({ ...dto, title: '' }).subscribe({ error: () => {} });

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).toBeNull();
    });
  });

  describe('update', () => {
    const createOne = (): Bookmark => {
      let created!: Bookmark;
      service
        .create({
          title: 'Editable',
          url: 'https://edit.example.com',
          category: 'General',
          isFavorite: false,
        })
        .subscribe((b) => (created = b));
      flushDelays();
      return created;
    };

    it('should merge changes into the stored bookmark', () => {
      const created = createOne();

      let updated: Bookmark | undefined;
      service
        .update(created.id, { title: 'Updated Title', isFavorite: true })
        .subscribe((b) => (updated = b));
      flushDelays();

      expect(updated!.title).toBe('Updated Title');
      expect(updated!.isFavorite).toBe(true);
      expect(updated!.url).toBe('https://edit.example.com'); // untouched field preserved
      expect(updated!.id).toBe(created.id);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Bookmark[];
      expect(stored.find((b) => b.id === created.id)?.title).toBe('Updated Title');
    });

    it('should keep the original id and createdAt when updating', () => {
      const created = createOne();

      let updated: Bookmark | undefined;
      service.update(created.id, { title: 'Renamed' }).subscribe((b) => (updated = b));
      flushDelays();

      expect(updated!.id).toBe(created.id);
      expect(updated!.createdAt).toBe(created.createdAt);
    });

    it('should error when the bookmark does not exist', () => {
      let errorMessage = '';

      service.update('missing-id', { title: 'Nope' }).subscribe({
        next: () => {
          throw new Error('should not emit on error');
        },
        error: (err: Error) => (errorMessage = err.message),
      });
      flushDelays();

      expect(errorMessage).toContain('missing-id');
    });
  });

  describe('delete', () => {
    it('should remove the bookmark from storage and emit its id', () => {
      let created!: Bookmark;
      service
        .create({
          title: 'Deletable',
          url: 'https://del.example.com',
          category: 'General',
          isFavorite: false,
        })
        .subscribe((b) => (created = b));
      flushDelays();

      let deletedId = '';
      service.delete(created.id).subscribe((id) => (deletedId = id));
      flushDelays();

      expect(deletedId).toBe(created.id);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Bookmark[];
      expect(stored.find((b) => b.id === created.id)).toBeUndefined();
    });

    it('should complete successfully when deleting an unknown id', () => {
      const complete = vi.fn();

      service.delete('unknown-id').subscribe({ complete });
      flushDelays();

      expect(complete).toHaveBeenCalled();
    });

    it('should only remove the targeted bookmark', () => {
      service.getAll().subscribe();
      flushDelays();

      const before = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Bookmark[];
      expect(before.length).toBeGreaterThan(1);

      service.delete(before[0].id).subscribe();
      flushDelays();

      const after = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Bookmark[];
      expect(after).toHaveLength(before.length - 1);
      expect(after.find((b) => b.id === before[0].id)).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('should clear storage and re-seed initial bookmarks', () => {
      let created!: Bookmark;
      service
        .create({
          title: 'Temp',
          url: 'https://temp.example.com',
          category: 'General',
          isFavorite: false,
        })
        .subscribe((b) => (created = b));
      flushDelays();

      let afterReset: Bookmark[] | undefined;
      service.reset().subscribe((list) => (afterReset = list));
      flushDelays();

      expect(afterReset!.some((b) => b.id === created.id)).toBe(false);
      expect(afterReset!.some((b) => b.title === 'Angular Documentation')).toBe(true);
    });
  });
});
