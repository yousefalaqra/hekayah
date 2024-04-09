import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UnitService } from '../../../../services/unit.service';
import { UnitStore } from '../../../../store/unit.store';
import { RequiredErrorStateMatcher } from '../../../../utils/form.utils';
import { Quantity, QuantityModel } from '../../../../models/feeds';
import { Unit, UnitType } from '../../../../models/unit';
import { UnitControlComponent } from '../unit-control/unit-control.component';
import { NgStyle } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'quantity-form',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    UnitControlComponent,
    NgStyle
  ],
  providers: [UnitService, UnitStore, ReactiveFormsModule, FormsModule],
  templateUrl: './quantity-form.component.html',
  styleUrl: './quantity-form.component.scss',
})
export class QuantityFormComponent implements OnInit, OnChanges {
  $volumeUnits = this.unitStore.$volumeUnits;
  $weightUnits = this.unitStore.$weightUnits;

  quantityForm = new FormGroup({
    amount: new FormControl<number | null>(null, Validators.required),
    unit: new FormControl<string>('', Validators.required),
  });

  matcher = new RequiredErrorStateMatcher();

  unitTypes = UnitType;

  fieldWidth = 200;
  fieldHeight = 56;
  fieldFontSize = 14

  fieldSize : 'small' | 'medium' | 'large' | 'default'= 'default'; 

  currentStyles: Record<string, string> = {};


  @Input() defaultQuantity?: Quantity;

  @Input()
  set size(size: 'small' | 'medium' | 'large' | 'default') {
    this.fieldSize = size;
    switch (size) {
      case 'small':
        this.fieldWidth = 90;
        this.fieldFontSize = 11;

        break;
        case 'medium':
          this.fieldWidth = 250;
          this.fieldFontSize = 16;
          break;
          case 'large':
            this.fieldWidth = 350;
            this.fieldFontSize = 18;
            break;
            default:
              this.fieldWidth = 200; // Use default width
              this.fieldFontSize = 14;
    }

    this.currentStyles = {
      'width': `${this.fieldWidth}px`,
      'font-size': `${this.fieldFontSize}px`
    };
  }

  @Output() quantityChanged = new EventEmitter<QuantityModel>();
  @Output() quantityFormGroup = new EventEmitter<FormGroup>();

  constructor(private unitService: UnitService, private unitStore: UnitStore) {}

  ngOnInit(): void {
    this.quantityFormGroup.emit(this.quantityForm);

    this.unitService
      .getUnits()
      .pipe(untilDestroyed(this))
      .subscribe((units) => this.unitStore.setUnits(units));

    this.quantityForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((quantityData) => {
        // Emit or perform actions with the updated quantity data here
        if (quantityData.amount && quantityData.unit) {
          this.quantityChanged.emit({
            amount: quantityData.amount,
            unit: quantityData.unit,
          });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.defaultQuantity && changes['defaultQuantity']) {
      this.unit.setValue(this.defaultQuantity.unit._id);
      this.amount.setValue(this.defaultQuantity.amount);
    }
  }

  updateUnitValue(event: Unit) {
    this.quantityForm.controls['unit'].setValue(event._id);
  }

  get unit() {
    return this.quantityForm.controls['unit'];
  }

  get amount() {
    return this.quantityForm.controls['amount'];
  }
}
