import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressModalComponent } from './core/components/progress-modal/progress-modal.component';
import { ProgressBarService } from './core/services/progress-bar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly progressBarService = inject(ProgressBarService);
  title = 'fh-gifs-app';
  showModal: boolean = false;

  ngOnInit(): void {
    this.progressBarService.progress
      .subscribe({
        next: progress => {
          this.showModal = progress > 0 && progress < 100;
          if (progress === 100) {
            setTimeout(() => {
              this.showModal = false;
              this.progressBarService.reset();
            }, 500);
          }
          if (progress === 0) {
            this.showModal = false;
          }
        }
      });
  }
}
