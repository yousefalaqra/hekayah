import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'nutrition',
    loadChildren: () =>
      import('./nutrition/nutrition.routes').then((mod) => mod.NUTRITION_ROUTES),
  },
];
