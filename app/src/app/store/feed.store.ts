import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Feed } from '../models/feeds';

@Injectable()
export class FeedStore {
  private $feeds: WritableSignal<Array<Feed>> = signal([]);
  private $activeFeed: WritableSignal<Feed | undefined> = signal(undefined);

  get feeds(): Signal<Array<Feed>> {
    return this.$feeds.asReadonly();
  }

  get activeFeed(): Signal<Feed | undefined> {
    return this.$activeFeed.asReadonly();
  }

  setFeeds(feeds: Array<Feed>): void {
    this.$feeds.set(feeds);
  }

  setActiveFeed(feed: Feed): void{
    this.$activeFeed.set(feed)
  }
}
