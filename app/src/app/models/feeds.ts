import { Unit } from "./unit";

export interface Feed {
    _id: string
  name: string;
  brand: Brand;
  quantity: Quantity;
  category: Category;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface Quantity {
  amount: number;
  unit: Unit;
}


enum Category {
  forages = 'Forages',
  grains = 'Grains',
  balancers_supplements = 'Balancers & Supplements',
  complete_feeds = 'Complete Feeds',
}
