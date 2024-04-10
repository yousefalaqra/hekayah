import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuantityFormComponent } from '../../../../feeds/quantity/quantity-form/quantity-form.component';
import { Feed } from '../../../../../models/feeds';
import { MealPortionModel } from '../../../../../models/meal';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@UntilDestroy()
@Component({
  selector: 'meal-portition-item',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    QuantityFormComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  templateUrl: './meal-portition-item.component.html',
  styleUrl: './meal-portition-item.component.scss',
})
export class MealPortitionItemComponent implements OnInit {
  @Input() feed!: Feed;

  mealPortition = new FormGroup({
    feedId: new FormControl('', Validators.required),
    quantity: new FormGroup({}),
  });

  @Output() mealPortitionAdd = new EventEmitter<MealPortionModel>();

  constructor() {}

  ngOnInit(): void {}

  updateMealPortionQuantity(quantityFrom: FormGroup) {
    this.mealPortition.controls['quantity'] = quantityFrom;
  }

  addPortition(): void {
    this.mealPortitionAdd.emit({
      feed: this.feed,
      quantity: this.mealPortition.controls['quantity'].value,
    } as MealPortionModel);
  }
}
