import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FeedService } from '../services/feed.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FeedStore } from '../store/feed.store';
import { Feed } from '../models/feeds';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'feeds-root',
  standalone: true,
  imports: [MatListModule, HttpClientModule],
  providers: [FeedService, FeedStore],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.scss',
})
export class FeedsComponent implements OnInit {
  feeds: Signal<Array<Feed>> = this.feedsStore.feeds;

  constructor(
    private feedsService: FeedService,
    private feedsStore: FeedStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.feedsService
      .getAllFeeds()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (feeds) => this.feedsStore.setFeeds(feeds),
        error: (err) => console.log(err),
      });
  }

  goToFeed(feedId: string): void{
    this.router.navigate(['/feeds', feedId]); // Route with ID parameter
   
  }
}
