import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RequiredErrorStateMatcher } from '../../../utils/form.utils';
import { MealService } from '../../../services/meal.service';
import { MealStore } from '../../../store/meal.store';
import { LifeStageStore } from '../../../store/life-stage.store';
import { LifeStageService } from '../../../services/life-stage.service';
import { FeedingTimeStore } from '../../../store/feeding-time.store';
import { FeedingTimeService } from '../../../services/feeding-time.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuantityFormComponent } from '../../feeds/quantity/quantity-form/quantity-form.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MealPortitionsComponent } from './meal-portitions/meal-portitions.component';


@UntilDestroy()
@Component({
  selector: 'new-meal',
  standalone: true,
  imports: [
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    QuantityFormComponent,
    MatSidenavModule,
    MealPortitionsComponent
  ],
  providers: [
    MealStore,
    MealService,
    LifeStageStore,
    LifeStageService,
    FeedingTimeStore,
    FeedingTimeService,
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.scss',
})
export class MealComponent implements OnInit {
  mealCategories = this.mealStore.mealCatgories;
  $lifeStages = this.lifeStageStore.$lifeStages;
  $feedingTimes = this.feedingTimeStore.$feedingTimes;

  $activeMeal = this.mealStore.$activeMeal;

  @ViewChild('mealDrawer') portionsSidenav?: MatSidenav;

  @Input()
  set mealId(mealId: string) {
    this.mealService
      .getMealById(mealId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (meal) => {
          this.mealStore.setActiveMeal(meal);
        },
      });
  }

  mealForm = new FormGroup({
    name: new FormControl(this.$activeMeal()?.name || '', Validators.required),
    category: new FormControl(this.$activeMeal()?.category || '', Validators.required),
    life_stage: new FormControl(this.$activeMeal()?.life_stage || ''),
    feeding_time: new FormControl(this.$activeMeal()?.feeding_time || ''),
    prep_method: new FormControl(this.$activeMeal()?.prep_method || ''),
    note: new FormControl(this.$activeMeal()?.note || ''),
    portions: new FormArray([
      new FormGroup({
        feedId: new FormControl(''),
      }),
      // You can add more portion FormGroups here
    ]),
  });

  matcher = new RequiredErrorStateMatcher();

  constructor(
    private mealService: MealService,
    private mealStore: MealStore,
    private lifeStageStore: LifeStageStore,
    private lifeStageService: LifeStageService,
    private feedingTimeStore: FeedingTimeStore,
    private feedingTimeService: FeedingTimeService,
  ) {}

  ngOnInit(): void {
    this.lifeStageService
      .getLifeStages()
      .pipe(untilDestroyed(this))
      .subscribe((lifeStages) => this.lifeStageStore.setLifeStages(lifeStages));

    this.feedingTimeService
      .getFeedingTimes()
      .pipe(untilDestroyed(this))
      .subscribe((feedingTimes) =>
        this.feedingTimeStore.setFeedingTimes(feedingTimes)
      );
  }

  get name() {
    return this.mealForm.controls['name'];
  }

  get category() {
    return this.mealForm.controls['category'];
  }

  get lifeStage() {
    return this.mealForm.controls['life_stage'];
  }

  get feedingTime() {
    return this.mealForm.controls['feeding_time'];
  }

  get prepMethod() {
    return this.mealForm.controls['prep_method'];
  }

  get note() {
    return this.mealForm.controls['note'];
  }

  addPortion() {
    this.mealForm.controls['portions'].push(this.createPortionFormGroup());
  }

  removePortion(index: number) {
    this.mealForm.controls['portions'].removeAt(index);
  }

  togglePortionsSidenav(event: Event): void{
    event.stopPropagation()
    const currentStatus = this.portionsSidenav?.opened;

    if(currentStatus){
      this.portionsSidenav?.close();
    }else{
      this.portionsSidenav?.open();

    }
  }



  saveMeal(): void {}

  createPortionFormGroup(): FormGroup {
    return new FormGroup({
      quantity: new FormControl(null, Validators.required),
      unit: new FormControl(''),
      ingredient: new FormControl(''),
    });
  }
}
