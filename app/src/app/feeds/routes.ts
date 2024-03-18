import { Route } from '@angular/router';
import { FeedsComponent } from './feeds.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';

export const FEED_ROUTES: Route[] = [
  { path: '', component: FeedsComponent },
  { path: ':feedId', component: FeedDetailsComponent },
  // ...
];
