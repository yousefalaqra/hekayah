import { Route } from '@angular/router';
import { FeedsComponent } from './feeds.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { CreateFeedComponent } from './create-feed/create-feed.component';
import { FeedsListComponent } from './feeds-list/feeds-list.component';
import { BrandsComponent } from './brands/brands.component';

export const FEED_ROUTES: Route[] = [
  {
    path: '',
    component: FeedsComponent,
    children: [
      { path: '', component: FeedsListComponent },
      { path: 'new', component: CreateFeedComponent },
      { path: 'brands', component: BrandsComponent },
      { path: ':feedId', component: FeedDetailsComponent },
    ],
  },
];
