export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  isFavorite: boolean;
  createdAt: string;
}

export type CreateBookmarkDto = Omit<Bookmark, 'id' | 'createdAt'>;
export type UpdateBookmarkDto = Partial<Omit<Bookmark, 'id' | 'createdAt'>>;
