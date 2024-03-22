import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Brand, Category, Feed, FeedModel } from '../models/feeds';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FeedStore {
  private $feeds: WritableSignal<Array<Feed>> = signal([]);
  private $activeFeed: WritableSignal<Feed | undefined> = signal(undefined);
  private $brands: WritableSignal<Array<Brand>> = signal([]);

  feedCatgories = [
    'Forages',
    'Grains',
    'Balancers & Supplements',
    'Complete Feeds',
  ];

  get feeds(): Signal<Array<Feed>> {
    return this.$feeds.asReadonly();
  }

  get activeFeed(): Signal<Feed | undefined> {
    return this.$activeFeed.asReadonly();
  }

  get brands(): Signal<Array<Brand>> {
    return this.$brands.asReadonly();
  }

  setFeeds(feeds: Array<Feed>): void {
    this.$feeds.set(feeds);
  }

  setActiveFeed(feed: Feed): void {
    this.$activeFeed.set(feed);
  }

  setBrands(brands: Array<Brand>): void {
    this.$brands.set(brands);
  }

  addFeed(feedModel: FeedModel) {
    const id = uuidv4();

    const unit = {}
    this.$feeds.update((state) => {
      return [
        ...state,
        {_id: id,  name: feedModel.name}
        
      ];
    });

    return id;
  }

  onAddFeedSuccess(currentId: string, feed: Feed) {
    this.$feeds.update((state) =>
      state.map((x) => (x._id === currentId ? feed : x))
    );
  }

  onAddFeedFailure(currentId: string) {
    this.$feeds.update((state) => state.filter((x) => x._id !== currentId));
  }

  addFeedbrand(brandName: string): string {
    const tempId = uuidv4();
    this.$brands.update((state) => {
      return [...state, { _id: tempId, name: brandName }];
    });
    return tempId;
  }

  confirmCreateBrand(currentId: string, brand: Brand): void {
    this.$brands.update((state) => {
      return state.map((x) => (x._id === currentId ? brand : x));
    });
  }

  cancleCreateBrand(currentId: string): void {
    this.$brands.update((state) => {
      return state.filter((x) => x._id !== currentId);
    });
  }
}
