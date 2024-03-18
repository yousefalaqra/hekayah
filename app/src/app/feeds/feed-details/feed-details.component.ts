import { Component, Input, OnInit, Signal, signal } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FeedService } from '../../services/feed.service';
import { FeedStore } from '../../store/feed.store';
import { Feed } from '../../models/feeds';
import { HttpClientModule } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'feeds-root',
  standalone: true,
  imports: [HttpClientModule],
  providers: [FeedService, FeedStore],
  templateUrl: './feed-details.component.html',
  styleUrl: './feed-details.component.scss',
})
export class FeedDetailsComponent implements OnInit {
  activeFeed: Signal<Feed | undefined> = this.feedStore.activeFeed;
  @Input()
  set feedId(feedId: string) {
    this.feedService
      .getFeedById(feedId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (feed) => {
          this.feedStore.setActiveFeed(feed);
        },
      });
  }

  constructor(private feedService: FeedService, private feedStore: FeedStore) {}

  ngOnInit(): void {}

}
