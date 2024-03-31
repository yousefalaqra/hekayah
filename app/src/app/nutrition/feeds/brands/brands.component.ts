import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FeedStore } from '../../../store/feed.store';
import { FeedService } from '../../../services/feed.service';
import { Brand } from '../../../models/feeds';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { BrandDialogComponent } from './brand-dialog/brand-dialog.component';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@UntilDestroy()
@Component({
  selector: 'brands-root',
  standalone: true,
  imports: [MatListModule, HttpClientModule, MatDialogModule, MatButtonModule],
  providers: [FeedService, FeedStore],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brands: Signal<Array<Brand>> = this.feedsStore.$brands;

  private recentCreatedBrandId = '';

  constructor(
    private feedsService: FeedService,
    private feedsStore: FeedStore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.feedsService
      .getFeedsBrands()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (brands) => this.feedsStore.setBrands(brands),
        error: (err) => console.log(err),
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BrandDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .pipe(
        switchMap((brandName: string) => {
          this.recentCreatedBrandId = this.feedsStore.addFeedbrand(brandName);
          return this.feedsService.createFeedsBrands(brandName);
        })
      )
      .subscribe({
        next: (brand) =>
          this.feedsStore.confirmCreateBrand(this.recentCreatedBrandId, brand),
          error: (err) => this.feedsStore.cancleCreateBrand(this.recentCreatedBrandId) 
      });
  }
}
