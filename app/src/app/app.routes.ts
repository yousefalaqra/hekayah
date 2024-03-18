import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feeds',
    loadChildren: () =>
      import('./feeds/routes').then((mod) => mod.FEED_ROUTES),
  },
];
