import { ProgressBarService } from '@/core/services/progress-bar.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-progress-modal',
  imports: [],
  templateUrl: './progress-modal.component.html',
  styleUrl: './progress-modal.component.css',
})
export class ProgressModalComponent implements OnInit, OnDestroy {
  private readonly progressBarService = inject(ProgressBarService);
  private readonly _destroy$ = new Subject<void>();
  progress: number = 0;

  ngOnInit(): void {
    this.progress;
    this.progressBarService.progress.pipe(takeUntil(this._destroy$)).subscribe({
      next: value => {
        this.progress = value;
      },
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
