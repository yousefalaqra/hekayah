import { Route } from '@angular/router';
import { MealsComponent } from './meals.component';
import { MealsListComponent } from './meals-list/meals-list.component';
import { LifeStagessComponent } from './life-stages/life-stages.component';
import { FeedingTimesComponent } from './feeding-times/feeding-time.component';
import { MealComponent } from './meal/meal.component';

export const MEALS_ROUTES: Route[] = [
  {
    path: '',
    component: MealsComponent,
    children: [
      { path: '', component: MealsListComponent },
      // { path: 'new', component: CreateFeedComponent },
      { path: 'life-stages', component: LifeStagessComponent },
      { path: 'feeding-times', component: FeedingTimesComponent },
      { path: ':mealId', component: MealComponent },
    ],
  },
];
