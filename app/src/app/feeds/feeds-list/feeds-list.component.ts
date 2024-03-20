import { Component, OnInit, Signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { FeedStore } from '../../store/feed.store';
import { Feed } from '../../models/feeds';
import { MatButtonModule } from '@angular/material/button';



@UntilDestroy()
@Component({
  selector: 'feeds-list',
  standalone: true,
  imports: [MatListModule, HttpClientModule, MatButtonModule],
  providers: [FeedService, FeedStore],
  templateUrl: './feeds-list.component.html',
  styleUrl: './feeds-list.component.scss',
})
export class FeedsListComponent implements OnInit {
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
  
  goToNew(): void{
    this.router.navigate(['/feeds/new']); // Route with ID parameter   

  }
}
