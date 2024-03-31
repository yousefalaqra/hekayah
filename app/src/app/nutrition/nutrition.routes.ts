import { Route } from '@angular/router';
import { NutritionComponent } from './nutrition.component';

export const NUTRITION_ROUTES: Route[] = [
  {
    path: '',
    component: NutritionComponent,
    children:[

      {
        path: 'feeds',
        loadChildren: () =>
          import('./feeds/feeds.routes').then((mod) => mod.FEED_ROUTES),
      },
      {
        path: 'meals',
        loadChildren: () =>
          import('./meals/meals.routes').then((mod) => mod.MEALS_ROUTES),
      },
    ]
  },

];
