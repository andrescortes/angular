import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkStore } from '../../store/bookmark.store';

@Component({
  selector: 'app-bookmark-manager',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './bookmark-manager.html',
  styleUrl: './bookmark-manager.css',
})
export class BookmarkManager {
  readonly store = inject(BookmarkStore);
  private readonly fb = inject(FormBuilder);

  readonly bookmarkForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    category: ['General', Validators.required],
    isFavorite: [false],
  });

  editingId: string | null = null;
  readonly defaultCategories = ['General', 'Documentation', 'Libraries', 'Styling', 'Videos', 'Tools'];

  selectForEdit(bookmark: Bookmark): void {
    this.editingId = bookmark.id;
    this.bookmarkForm.setValue({
      title: bookmark.title,
      url: bookmark.url,
      category: bookmark.category,
      isFavorite: bookmark.isFavorite,
    });
    this.store.selectBookmark(bookmark.id);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.bookmarkForm.reset({
      title: '',
      url: '',
      category: 'General',
      isFavorite: false,
    });
    this.store.selectBookmark(null);
  }

  save(): void {
    if (this.bookmarkForm.invalid) {
      this.bookmarkForm.markAllAsTouched();
      return;
    }

    const formValue = this.bookmarkForm.getRawValue();

    if (this.editingId) {
      this.store.updateBookmark({
        id: this.editingId,
        changes: formValue,
      });
      this.cancelEdit();
    } else {
      this.store.createBookmark(formValue);
      this.cancelEdit();
    }
  }

  remove(id: string, event?: Event): void {
    event?.stopPropagation();
    if (confirm('Delete this bookmark?')) {
      this.store.deleteBookmark(id);
      if (this.editingId === id) {
        this.cancelEdit();
      }
    }
  }

  toggleFav(id: string, event?: Event): void {
    event?.stopPropagation();
    this.store.toggleFavorite(id);
  }
}
