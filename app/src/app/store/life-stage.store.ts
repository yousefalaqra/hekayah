import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { LifeStage, LifeStageModel } from '../models/life-stage';
@Injectable()
export class LifeStageStore {
  private lifeStages: WritableSignal<Array<LifeStage>> = signal([]);

  get $lifeStages(): Signal<Array<LifeStage>> {
    return this.lifeStages.asReadonly();
  }

  setLifeStages(lifeStages: Array<LifeStage>): void {
    this.lifeStages.set(lifeStages);
  }

  addLifeStage(lifeStage: LifeStageModel): string {
    const tempId = uuidv4();
    this.lifeStages.update((state) => {
      return [
        ...state,
        {
          _id: tempId,
          work_level: lifeStage.work_level,
          name: lifeStage.name,
          nutritional_requirements: lifeStage.nutritional_requirements,
          age_range: lifeStage.age_range,
          gestation_stage: lifeStage.gestation_stage,
        },
      ];
    });
    return tempId;
  }

  addLifeStageSuccess(currentId: string, lifeStage: LifeStage): void {
    this.lifeStages.update((state) => {
      return state.map((x) => (x._id === currentId ? lifeStage : x));
    });
  }

  addLifeStageFailure(currentId: string): void {
    this.lifeStages.update((state) => {
      return state.filter((x) => x._id !== currentId);
    });
  }
}
