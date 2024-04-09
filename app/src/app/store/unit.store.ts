import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';import { Unit, UnitModel, UnitType } from '../models/unit';
import { BehaviorSubject } from 'rxjs';
;

@Injectable()
export class UnitStore {
  private units: WritableSignal<Array<Unit>> = signal([]);
  private unitsUpdatedSource = new BehaviorSubject<Unit[]>([]);
  
  $volumeUnits: Signal<Array<Unit>> = computed(()=> this.$units().filter(x => x.type === UnitType.volume));
  $weightUnits: Signal<Array<Unit>> = computed(() => this.$units().filter(X => X.type === UnitType.weight));


  unitsUpdated$ = this.unitsUpdatedSource.asObservable();

  get $units(): Signal<Array<Unit>> {
    return this.units.asReadonly();
  }


  setUnits(units: Array<Unit>): void {
    this.units.set(units);
    this.unitsUpdatedSource.next(units); 
  }



  addUnit(unit: UnitModel): string {
    const tempId = uuidv4();
    this.units.update((state) => {
      return [...state, { _id: tempId, name: unit.name, abbreviation: unit.abbreviation, type: unit.type}];
    });
    return tempId;
  }

  confirmCreateBrand(currentId: string, unit: Unit): void {
    this.units.update((state) => {
      return state.map((x) => (x._id === currentId ? unit : x));
    });
  }

  cancleCreateBrand(currentId: string): void {
    this.units.update((state) => {
      return state.filter((x) => (x._id !== currentId));
    });
  }
}
