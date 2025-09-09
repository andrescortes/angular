import { Routes } from '@angular/router';

import { CounterPageComponent } from '@/pages/counter/counter-page.component';
import { HeroComponent } from '@/pages/hero/hero.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  },
  {
    path: 'hero',
    component: HeroComponent
  }
];
