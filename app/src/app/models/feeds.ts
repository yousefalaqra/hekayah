import { Unit } from "./unit";

export interface Feed {
    _id: string
  name: string;
  brand?: Brand;
  quantity?: Quantity;
  category?: FeedCategory;
  note?: string;
}

export enum FeedCategory{
  forages = "Forages", 
  grains  ="Grains", 
  balancers_supplements = "Balancers & Supplements",
  complete_feeds ="Complete Feeds"
}

export interface FeedModel {
  name: string;
  brand: string;
  quantity: QuantityModel;
  category: FeedCategory;
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
