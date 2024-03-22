export enum UnitType {
  weight = 'weight',
  volume = 'volume',
}

export interface Unit {
  _id: string;
  name: string;
  abbreviation: string;
  type: UnitType;
}

export interface UnitModel{
    name: string;
    abbreviation: string;
    type: UnitType;
}
