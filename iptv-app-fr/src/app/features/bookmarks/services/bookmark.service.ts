import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Bookmark, CreateBookmarkDto, UpdateBookmarkDto } from '../models/bookmark.model';

const STORAGE_KEY = 'signal_store_bookmarks';

const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    title: 'Angular Documentation',
    url: 'https://angular.dev',
    category: 'Documentation',
    isFavorite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'NgRx SignalStore Docs',
    url: 'https://ngrx.io/guide/signals/signal-store',
    category: 'Libraries',
    isFavorite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Tailwind CSS v4',
    url: 'https://tailwindcss.com',
    category: 'Styling',
    isFavorite: false,
    createdAt: new Date().toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private getStoredBookmarks(): Bookmark[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKMARKS));
      return INITIAL_BOOKMARKS;
    }
    try {
      return JSON.parse(data) as Bookmark[];
    } catch {
      return INITIAL_BOOKMARKS;
    }
  }

  private persist(bookmarks: Bookmark[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  getAll(): Observable<Bookmark[]> {
    const list = this.getStoredBookmarks();
    return of(list).pipe(delay(400));
  }

  create(dto: CreateBookmarkDto): Observable<Bookmark> {
    if (!dto.title.trim()) {
      return throwError(() => new Error('Title cannot be empty'));
    }

    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title: dto.title,
      url: dto.url,
      category: dto.category || 'General',
      isFavorite: !!dto.isFavorite,
      createdAt: new Date().toISOString(),
    };

    const current = this.getStoredBookmarks();
    const updated = [newBookmark, ...current];
    this.persist(updated);

    return of(newBookmark).pipe(delay(350));
  }

  update(id: string, dto: UpdateBookmarkDto): Observable<Bookmark> {
    const current = this.getStoredBookmarks();
    const index = current.findIndex((b) => b.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Bookmark with id ${id} not found`));
    }

    const updatedBookmark: Bookmark = {
      ...current[index],
      ...dto,
    };

    current[index] = updatedBookmark;
    this.persist(current);

    return of(updatedBookmark).pipe(delay(300));
  }

  delete(id: string): Observable<string> {
    const current = this.getStoredBookmarks();
    const filtered = current.filter((b) => b.id !== id);
    this.persist(filtered);
    return of(id).pipe(delay(300));
  }

  reset(): Observable<Bookmark[]> {
    localStorage.removeItem(STORAGE_KEY);
    return this.getAll();
  }
}
