import { FeedingTime } from './feeding-time';
import { Feed, Quantity, QuantityModel } from './feeds';
import { LifeStage } from './life-stage';

export enum MealCategory {
  forage = 'Forage',
  concentrate = 'Concentrate',
}


export interface MealPortion {
  feed: Feed;
  quantity: Quantity;
}

export interface MealPortionModel {
  feed: Feed;
  quantity: Quantity;
}

export interface Meal {
  _id: string;
  name: string;
  category: MealCategory;
  life_stage: LifeStage;
  feeding_time: FeedingTime;
  prep_method: string;
  portions: Array<MealPortion>;
  note: string;
}

export interface MealModel {
  name: string;
  category?: MealCategory;
  life_stage?: LifeStage;
  feeding_time?: FeedingTime;
  prep_method?: string;
  portions?: Array<MealPortion>;
  note?: string;
}
