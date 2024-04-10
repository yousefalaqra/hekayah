import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FeedService } from '../../../../services/feed.service';
import { FeedStore } from '../../../../store/feed.store';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MealPortionModel } from '../../../../models/meal';
import { MealPortitionItemComponent } from './meal-portition-item/meal-portition-item.component';
import { MealStore } from '../../../../store/meal.store';
import { Feed } from '../../../../models/feeds';

@UntilDestroy()
@Component({
  selector: 'meal-portitions',
  standalone: true,
  imports: [
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MealPortitionItemComponent,
  ],
  providers: [FeedService, FeedStore],
  templateUrl: './meal-portitions.component.html',
  styleUrl: './meal-portitions.component.scss',
})
export class MealPortitionsComponent implements OnInit {
  $feeds = this.feedStore.$feeds;
  $activeMeal = this.mealStore.$activeMeal;

  constructor(
    private feedService: FeedService,
    private feedStore: FeedStore,
    private mealStore: MealStore
  ) {}

  ngOnInit(): void {
    this.feedService
      .getAllFeeds()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (feeds) => this.feedStore.setFeeds(feeds),
      });
  }

  addMealPortition(mealPortition: MealPortionModel): void {
    this.mealStore.addMealPortition(mealPortition);
  }

  isAdded(item: Feed) {
    const activeMeal = this.$activeMeal();
    if (activeMeal) {
      return activeMeal.portions.some((x) => x.feed._id === item._id);
    } else {
      return false;
    }
  }
}
