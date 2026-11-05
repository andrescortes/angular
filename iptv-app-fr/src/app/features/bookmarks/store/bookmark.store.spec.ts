import { TestBed } from '@angular/core/testing';
import { BookmarkStore } from './bookmark.store';
import { BookmarkService } from '../services/bookmark.service';
import { of } from 'rxjs';
import { Bookmark } from '../models/bookmark.model';

describe('BookmarkStore', () => {
  let store: InstanceType<typeof BookmarkStore>;
  let bookmarkServiceMock: {
    getAll: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    reset: ReturnType<typeof vi.fn>;
  };

  const mockBookmarks: Bookmark[] = [
    {
      id: 'b1',
      title: 'Angular Docs',
      url: 'https://angular.dev',
      category: 'Documentation',
      isFavorite: true,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'b2',
      title: 'NgRx Signals',
      url: 'https://ngrx.io',
      category: 'Libraries',
      isFavorite: false,
      createdAt: '2026-01-02T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    bookmarkServiceMock = {
      getAll: vi.fn().mockReturnValue(of(mockBookmarks)),
      create: vi.fn().mockImplementation((dto) =>
        of({
          id: 'b3',
          ...dto,
          createdAt: new Date().toISOString(),
        })
      ),
      update: vi.fn().mockImplementation((id, changes) =>
        of({
          ...mockBookmarks.find((b) => b.id === id),
          ...changes,
        })
      ),
      delete: vi.fn().mockReturnValue(of('b1')),
      reset: vi.fn().mockReturnValue(of(mockBookmarks)),
    };

    TestBed.configureTestingModule({
      providers: [
        BookmarkStore,
        { provide: BookmarkService, useValue: bookmarkServiceMock },
      ],
    });

    store = TestBed.inject(BookmarkStore);
  });

  it('should initialize with loaded bookmarks and default filter state', () => {
    expect(store.entities().length).toBe(2);
    expect(store.ids()).toEqual(['b1', 'b2']);
    expect(store.stats().total).toBe(2);
    expect(store.stats().favorites).toBe(1);
  });

  it('should filter bookmarks by query correctly', () => {
    store.setSearchQuery('Signals');
    expect(store.filteredBookmarks().length).toBe(1);
    expect(store.filteredBookmarks()[0].title).toBe('NgRx Signals');
  });

  it('should filter bookmarks by category and favorites', () => {
    store.setSelectedCategory('Documentation');
    expect(store.filteredBookmarks().length).toBe(1);
    expect(store.filteredBookmarks()[0].id).toBe('b1');

    store.toggleFavoritesOnly();
    expect(store.filteredBookmarks().length).toBe(1);
  });

  it('should add an entity on createBookmark', () => {
    store.createBookmark({
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      category: 'Styling',
      isFavorite: false,
    });

    expect(bookmarkServiceMock.create).toHaveBeenCalled();
    expect(store.entityMap()['b3']).toBeDefined();
    expect(store.entities().length).toBe(3);
  });

  it('should delete an entity on deleteBookmark', () => {
    store.deleteBookmark('b1');

    expect(bookmarkServiceMock.delete).toHaveBeenCalledWith('b1');
    expect(store.entityMap()['b1']).toBeUndefined();
    expect(store.entities().length).toBe(1);
  });

  it('should perform optimistic update when toggling favorite', () => {
    expect(store.entityMap()['b2'].isFavorite).toBe(false);

    store.toggleFavorite('b2');
    expect(store.entityMap()['b2'].isFavorite).toBe(true);
  });
});
