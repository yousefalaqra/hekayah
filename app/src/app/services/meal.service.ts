import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal, MealModel } from '../models/meal';

const BASE_URL = 'http://localhost:3000/meals'; // Define base URL in a separate config file

@Injectable()
export class MealService {
  constructor(private http: HttpClient) {}

  createMeal(model: MealModel) {
    return this.http.post<Meal>(`${BASE_URL}`, model);
  }

  getAllMeals() {
    return this.http.get<Array<Meal>>(`${BASE_URL}`);
  }

  getMealById(mealId: string) {
    return this.http.get<Meal>(`${BASE_URL}/${mealId}`);
  }
}
