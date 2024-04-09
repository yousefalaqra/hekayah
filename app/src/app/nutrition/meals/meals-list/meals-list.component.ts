import { Component, OnInit, Signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MealStore } from '../../../store/meal.store';
import { MealService } from '../../../services/meal.service';
import { Meal } from '../../../models/meal';

@UntilDestroy()
@Component({
  selector: 'meals-list',
  standalone: true,
  imports: [MatListModule, HttpClientModule, MatButtonModule],
  providers: [MealService, MealStore],
  templateUrl: './meals-list.component.html',
  styleUrl: './meals-list.component.scss',
})
export class MealsListComponent implements OnInit {
  $meals: Signal<Array<Meal>> = this.mealStore.$meals;

  constructor(
    private mealService: MealService,
    private mealStore: MealStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mealService
      .getAllMeals()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (meals) => this.mealStore.setMeals(meals),
        error: (err) => console.log(err),
      });
  }

  goToMeal(mealId: string): void {
    this.router.navigate(['/nutrition/meals', mealId]); // Route with ID parameter
  }

  goToNew(): void {
    this.mealService
      .createMeal({ name: 'Untitled meal' })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (meal) => {
          this.router.navigate(['/nutrition/meals', meal._id]); // Route with ID parameter
        },
      });
  }
}
