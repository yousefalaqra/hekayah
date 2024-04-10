import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeedService } from '../../../services/feed.service';
import { FeedStore } from '../../../store/feed.store';
import { MatButtonModule } from '@angular/material/button';
import { UnitService } from '../../../services/unit.service';
import { UnitStore } from '../../../store/unit.store';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequiredErrorStateMatcher } from '../../../utils/form.utils';
import { FeedCategory, FeedModel, QuantityModel } from '../../../models/feeds';
import { Router } from '@angular/router';
import { QuantityFormComponent } from '../quantity/quantity-form/quantity-form.component';
import { Unit } from '../../../models/unit';

@UntilDestroy()
@Component({
  selector: 'create-feed',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    QuantityFormComponent,
  ],
  providers: [
    FeedService,
    UnitService,
    FeedStore,
    UnitStore,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './create-feed.component.html',
  styleUrl: './create-feed.component.scss',
})
export class CreateFeedComponent implements OnInit {
  $brands = this.feedStore.$brands;
  categories = this.feedStore.feedCatgories;
  $volumeUnits = this.unitStore.$volumeUnits;
  $weightUnits = this.unitStore.$weightUnits;

  quantityModel?: {
    unit?: Unit;
    amount?: number | null;
  };

  feedForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl(FeedCategory, Validators.required),
    brand: new FormControl('', Validators.required),
    note: new FormControl(''),
  });

  matcher = new RequiredErrorStateMatcher();

  constructor(
    private feedService: FeedService,
    private unitService: UnitService,
    private feedStore: FeedStore,
    private unitStore: UnitStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.feedService
      .getFeedsBrands()
      .pipe(untilDestroyed(this))
      .subscribe((brands) => this.feedStore.setBrands(brands));

    this.unitService
      .getUnits()
      .pipe(untilDestroyed(this))
      .subscribe((units) => this.unitStore.setUnits(units));
  }

  get name() {
    return this.feedForm.controls['name'];
  }

  get category() {
    return this.feedForm.controls['category'];
  }

  get brand() {
    return this.feedForm.controls['brand'];
  }

  get note() {
    return this.feedForm.controls['note'];
  }

  saveFeed(): void {
    const feedModel: FeedModel = {
      name: this.name.value!,
      brand: this.brand.value!,
      category: this.category.value! as unknown as FeedCategory,
      note: this.note.value!,
      quantity: {
        amount: this.quantityModel?.amount as number,
        unit: this.quantityModel?.unit?._id!,
      },
    };

    this.feedService
      .createFeed(feedModel)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (feed) => {
          this.router.navigate(['/nutrition/feeds']);
        },
        error: (err) => {},
      });
  }
}
