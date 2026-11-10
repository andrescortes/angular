import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Bookmark, CreateBookmarkDto, UpdateBookmarkDto } from '../models/bookmark.model';
import { BookmarkService } from '../services/bookmark.service';

export interface BookmarkFilterState {
  searchQuery: string;
  selectedCategory: string;
  onlyFavorites: boolean;
  selectedBookmarkId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialBookmarkFilterState: BookmarkFilterState = {
  searchQuery: '',
  selectedCategory: 'ALL',
  onlyFavorites: false,
  selectedBookmarkId: null,
  isLoading: false,
  error: null,
};

export const BookmarkStore = signalStore(
  { providedIn: 'root' },
  // 1. Entity management (entities, ids, entityMap)
  withEntities<Bookmark>(),
  // 2. Custom state slice
  withState(initialBookmarkFilterState),
  // 3. Computed / derived signals (selectors)
  withComputed((store) => {
    const categories = computed(() => {
      const all = store.entities().map((b) => b.category);
      return ['ALL', ...Array.from(new Set(all))];
    });

    const filteredBookmarks = computed(() => {
      const query = store.searchQuery().toLowerCase().trim();
      const cat = store.selectedCategory();
      const favOnly = store.onlyFavorites();

      return store.entities().filter((item) => {
        const matchesQuery =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.url.toLowerCase().includes(query);
        const matchesCat = cat === 'ALL' || item.category === cat;
        const matchesFav = !favOnly || item.isFavorite;

        return matchesQuery && matchesCat && matchesFav;
      });
    });

    const selectedBookmark = computed(() => {
      const id = store.selectedBookmarkId();
      return id ? store.entityMap()[id] ?? null : null;
    });

    const stats = computed(() => {
      const total = store.entities().length;
      const favorites = store.entities().filter((b) => b.isFavorite).length;
      return { total, favorites };
    });

    return {
      categories,
      filteredBookmarks,
      selectedBookmark,
      stats,
    };
  }),
  // 4. Methods for CRUD, filter, and async interactions
  withMethods((store, bookmarkService = inject(BookmarkService)) => ({
    // Filter controls
    setSearchQuery(searchQuery: string): void {
      patchState(store, { searchQuery });
    },
    setSelectedCategory(selectedCategory: string): void {
      patchState(store, { selectedCategory });
    },
    toggleFavoritesOnly(): void {
      patchState(store, (state) => ({ onlyFavorites: !state.onlyFavorites }));
    },
    selectBookmark(id: string | null): void {
      patchState(store, { selectedBookmarkId: id });
    },

    // READ: Load all bookmarks
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          bookmarkService.getAll().pipe(
            tapResponse({
              next: (bookmarks) => {
                patchState(store, setAllEntities(bookmarks), { isLoading: false });
              },
              error: (err: Error) => {
                patchState(store, { error: err.message, isLoading: false });
              },
            })
          )
        )
      )
    ),

    // CREATE: Add new bookmark
    createBookmark: rxMethod<CreateBookmarkDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((dto) =>
          bookmarkService.create(dto).pipe(
            tapResponse({
              next: (created) => {
                patchState(store, addEntity(created), {
                  isLoading: false,
                  selectedBookmarkId: created.id,
                });
              },
              error: (err: Error) => {
                patchState(store, { error: err.message, isLoading: false });
              },
            })
          )
        )
      )
    ),

    // UPDATE: Update existing bookmark
    updateBookmark: rxMethod<{ id: string; changes: UpdateBookmarkDto }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, changes }) =>
          bookmarkService.update(id, changes).pipe(
            tapResponse({
              next: (updated) => {
                patchState(
                  store,
                  updateEntity({ id: updated.id, changes: updated }),
                  { isLoading: false }
                );
              },
              error: (err: Error) => {
                patchState(store, { error: err.message, isLoading: false });
              },
            })
          )
        )
      )
    ),

    // Fast toggle favorite
    toggleFavorite(id: string): void {
      const item = store.entityMap()[id];
      if (!item) return;

      const newFavoriteState = !item.isFavorite;
      // Optimistic update
      patchState(store, updateEntity({ id, changes: { isFavorite: newFavoriteState } }));
      bookmarkService.update(id, { isFavorite: newFavoriteState }).subscribe({
        error: (err) => {
          // Rollback on error
          patchState(store, updateEntity({ id, changes: { isFavorite: !newFavoriteState } }), {
            error: err.message,
          });
        },
      });
    },

    // RESET to initial sample data
    resetToDefault: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          bookmarkService.reset().pipe(
            tapResponse({
              next: (bookmarks) => {
                patchState(store, setAllEntities(bookmarks), {
                  isLoading: false,
                  selectedBookmarkId: null,
                });
              },
              error: (err: Error) => {
                patchState(store, { error: err.message, isLoading: false });
              },
            })
          )
        )
      )
    ),

    // DELETE: Delete bookmark
    deleteBookmark: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((id) =>
          bookmarkService.delete(id).pipe(
            tapResponse({
              next: (deletedId) => {
                patchState(store, removeEntity(deletedId), (state) => ({
                  isLoading: false,
                  selectedBookmarkId:
                    state.selectedBookmarkId === deletedId ? null : state.selectedBookmarkId,
                }));
              },
              error: (err: Error) => {
                patchState(store, { error: err.message, isLoading: false });
              },
            })
          )
        )
      )
    ),
  })),
  // 5. Lifecycle hooks
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
