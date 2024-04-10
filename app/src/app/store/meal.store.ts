import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { Meal, MealCategory, MealModel, MealPortionModel } from '../models/meal';

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

  addMealPortition(mealPortition: MealPortionModel) {
    this.activeMeal.update(value => {
      if(value){
        const currentPortitions = value?.portions || [];
        const updatedPortitions = currentPortitions.concat({feed: mealPortition.feed, quantity: mealPortition.quantity});
        return {...value, portions: updatedPortitions}
      }else{
        return undefined;
      }
    })
  }

  removeMealPortition(feedId: string) {
    this.activeMeal.update(val =>{
      if(val){
        const updatedPortitions = val.portions.filter(x => x.feed._id !== feedId);
        return {...val, portions: updatedPortitions}
      }else{
        return undefined
      }
    })
  }
}
