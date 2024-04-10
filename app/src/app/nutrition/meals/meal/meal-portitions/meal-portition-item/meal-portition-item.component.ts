import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuantityFormComponent } from '../../../../feeds/quantity/quantity-form/quantity-form.component';
import { Feed, Quantity, QuantityModel } from '../../../../../models/feeds';
import { MealPortionModel } from '../../../../../models/meal';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Unit } from '../../../../../models/unit';

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
    MatInputModule,
  ],
  providers: [],
  templateUrl: './meal-portition-item.component.html',
  styleUrl: './meal-portition-item.component.scss',
})
export class MealPortitionItemComponent implements OnInit {
  @Input() feed!: Feed;
  @Input() added : boolean = false

  quantity?: Quantity;

  @Output() mealPortitionAdd = new EventEmitter<MealPortionModel>();

  constructor() {}

  ngOnInit(): void {}

  updateMealPortionQuantity(quantity: { unit?: Unit; amount?: number | null }) {
    if (quantity.unit && quantity.amount) {
      this.quantity = quantity as Quantity;
    }
  }

  addPortition(): void {
    if (this.quantity) {
      this.mealPortitionAdd.emit({
        feed: this.feed,
        quantity: this.quantity,
      });
    }
  }
}
