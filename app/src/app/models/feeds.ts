import { Unit } from "./unit";

export interface Feed {
    _id: string
  name: string;
  brand?: Brand;
  quantity?: Quantity;
  category?: Category;
  note?: string;
}

export interface FeedModel {
  name: string;
  brand: string;
  quantity: QuantityModel;
  category: Category;
  note?: string;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface QuantityModel {
  amount: number;
  unit: string;
}

export interface Quantity {
  amount: number;
  unit: Unit;
}


export enum Category {
  forages = 'Forages',
  grains = 'Grains',
  balancers_supplements = 'Balancers & Supplements',
  complete_feeds = 'Complete Feeds',
}
