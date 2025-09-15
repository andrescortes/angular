import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar.service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const progressBarService = inject(ProgressBarService);
  const clonedReq = req.clone({
    reportProgress: true,
  });

  let displayedProgress = 0;
  const maxStages = 10;

  return next(clonedReq).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          displayedProgress = Math.min(displayedProgress + 100 / maxStages, 95);
          progressBarService.setProgress(Math.round(displayedProgress));
        } else if (event.type === HttpEventType.Response) {
          progressBarService.setProgress(100);
        }
      },
    }),
    finalize(() => {
      displayedProgress = 0;
      progressBarService.reset();
    })
  );
};
