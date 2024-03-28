import { Component, OnInit, Signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { FeedingTime, FeedingTimeModel } from '../../models/feeding-time';
import { FeedingTimeService } from '../../services/feeding-time.service';
import { FeedingTimeStore } from '../../store/feeding-time.store';
import { FeedingTimeDialogComponent } from './feeding-time-dialog/feeding-time-dialog.component';

@UntilDestroy()
@Component({
  selector: 'brands-root',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    MatDividerModule,
  ],
  providers: [FeedingTimeService, FeedingTimeStore],
  templateUrl: './feeding-time.component.html',
  styleUrl: './feeding-time.component.scss',
})
export class FeedingTimesComponent implements OnInit {
  $feedingTimes: Signal<Array<FeedingTime>> =
    this.feedingTimeStore.$feedingTimes;

  private recentCreatedFeedingTimeId = '';

  constructor(
    private feedingTimeService: FeedingTimeService,
    private feedingTimeStore: FeedingTimeStore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.feedingTimeService
      .getFeedingTimes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (feedingTimes) =>
          this.feedingTimeStore.setFeedingTimes(feedingTimes),
        error: (err) => console.log(err),
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedingTimeDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .pipe(
        switchMap((feedingTime: FeedingTimeModel) => {
          this.recentCreatedFeedingTimeId =
            this.feedingTimeStore.addFeedTime(feedingTime);
          return this.feedingTimeService.createFeedingTime(feedingTime);
        })
      )
      .subscribe({
        next: (feedingTime) =>
          this.feedingTimeStore.addFeedingTimeSuccess(
            this.recentCreatedFeedingTimeId,
            feedingTime
          ),
        error: (err) =>
          this.feedingTimeStore.addFeedingTimeFailure(
            this.recentCreatedFeedingTimeId
          ),
      });
  }
}
