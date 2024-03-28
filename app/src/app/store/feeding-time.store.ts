import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { FeedingTime, FeedingTimeModel } from '../models/feeding-time';
@Injectable()
export class FeedingTimeStore {
  private feedingTimes: WritableSignal<Array<FeedingTime>> = signal([]);

  get $feedingTimes(): Signal<Array<FeedingTime>> {
    return this.feedingTimes.asReadonly();
  }

  setFeedingTimes(feedingTimes: Array<FeedingTime>): void {
    this.feedingTimes.set(feedingTimes);
  }

  addFeedTime(feedingTime: FeedingTimeModel): string {
    const tempId = uuidv4();
    this.feedingTimes.update((state) => {
      return [
        ...state,
        {
          _id: tempId,
          name: feedingTime.name,
          time: feedingTime.time,
        },
      ];
    });
    return tempId;
  }

  addFeedingTimeSuccess(currentId: string, feedingTime: FeedingTime): void {
    this.feedingTimes.update((state) => {
      return state.map((x) => (x._id === currentId ? feedingTime : x));
    });
  }

  addFeedingTimeFailure(currentId: string): void {
    this.feedingTimes.update((state) => {
      return state.filter((x) => x._id !== currentId);
    });
  }
}
