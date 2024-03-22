import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';import { Unit, UnitModel } from '../models/unit';
;

@Injectable()
export class UnitStore {
  private $units: WritableSignal<Array<Unit>> = signal([]);

  get units(): Signal<Array<Unit>> {
    return this.$units.asReadonly();
  }


  setUnits(units: Array<Unit>): void {
    this.$units.set(units);
  }



  addUnit(unit: UnitModel): string {
    const tempId = uuidv4();
    this.$units.update((state) => {
      return [...state, { _id: tempId, name: unit.name, abbreviation: unit.abbreviation, type: unit.type}];
    });
    return tempId;
  }

  confirmCreateBrand(currentId: string, unit: Unit): void {
    this.$units.update((state) => {
      return state.map((x) => (x._id === currentId ? unit : x));
    });
  }

  cancleCreateBrand(currentId: string): void {
    this.$units.update((state) => {
      return state.filter((x) => (x._id !== currentId));
    });
  }
}
