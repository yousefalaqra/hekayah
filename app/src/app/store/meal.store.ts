import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { Meal, MealCategory, MealModel } from '../models/meal';

@Injectable()
export class MealStore {
  private meals: WritableSignal<Array<Meal>> = signal([]);
  private activeMeal: WritableSignal<Meal | undefined> = signal(undefined);

  mealCatgories = Object.values(MealCategory);

  get $meals(): Signal<Array<Meal>> {
    return this.meals.asReadonly();
  }

  get $activeMeal(): Signal<Meal | undefined> {
    return this.activeMeal.asReadonly();
  }

  setMeals(meals: Array<Meal>): void {
    this.meals.set(meals);
  }

  setActiveMeal(meal: Meal): void {
    this.activeMeal.set(meal);
  }

  //   addMeal(meal: MealModel) {
  //     const id = uuidv4();

  //     this.meals.update((state) => {
  //       return [
  //         ...state,
  //         {_id: id,  name: meal.name, }

  //       ];
  //     });

  //     return id;
  //   }

  //   onAddFeedSuccess(currentId: string, feed: Feed) {
  //     this.$feeds.update((state) =>
  //       state.map((x) => (x._id === currentId ? feed : x))
  //     );
  //   }

  //   onAddFeedFailure(currentId: string) {
  //     this.$feeds.update((state) => state.filter((x) => x._id !== currentId));
  //   }
}
