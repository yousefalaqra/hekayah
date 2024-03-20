import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeedService } from '../../services/feed.service';
import { FeedStore } from '../../store/feed.store';
import { MatButtonModule } from '@angular/material/button';

@UntilDestroy()
@Component({
  selector: 'create-feed',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [FeedService, FeedStore],
  templateUrl: './create-feed.component.html',
  styleUrl: './create-feed.component.scss',
})
export class CreateFeedComponent implements OnInit {
  $brands = this.feedStore.brands;

  constructor(private feedService: FeedService, private feedStore: FeedStore) {}

  ngOnInit(): void {
    this.feedService
      .getFeedsBrands()
      .pipe(untilDestroyed(this))
      .subscribe((brands) => this.feedStore.setBrands(brands));
  }
}
