import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  computed,
  effect,
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
import { Unit, UnitType } from '../../../../models/unit';
import { NgStyle } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'unit-control',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgStyle,
  ],
  providers: [UnitService, UnitStore, ReactiveFormsModule, FormsModule],
  templateUrl: './unit-control.component.html',
  styleUrl: './unit-control.component.scss',
})
export class UnitControlComponent implements OnInit {
  $volumeUnits = this.unitStore.$volumeUnits;
  $weightUnits = this.unitStore.$weightUnits;

  unit = new FormControl('', Validators.required);
  units = new Array<Unit>();

  matcher = new RequiredErrorStateMatcher();

  unitTypes = UnitType;

  fieldWidth = 200;
  fieldHeight = 56;
  fieldFontSize = 14;
  fieldSize: 'small' | 'medium' | 'large' | 'default' = 'default';

  currentStyles: Record<string, string> = {};

  showFullUnit = true;

  defaultUnit?: Unit;
  @Input() unitId?: Unit;
  @Input()
  set size(size: 'small' | 'medium' | 'large' | 'default') {
    this.fieldSize = size;
    switch (size) {
      case 'small':
        this.fieldWidth = 90;
        this.fieldFontSize = 11;
        this.showFullUnit = false;
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
      width: `${this.fieldWidth}px`,
      'font-size': `${this.fieldFontSize}px`,
    };
  }

  @Output() unitChanged = new EventEmitter<Unit>();
  @Output() quantityFormControl = new EventEmitter<FormControl>();

  constructor(private unitService: UnitService, private unitStore: UnitStore) {}

  ngOnInit(): void {
    this.unitStore.unitsUpdated$.pipe(untilDestroyed(this)).subscribe({
      next: (val) => {
        this.units = val;

        this.defaultUnit = this.units.find((x) => x._id === this.unitId as unknown  as string);
        this.unit.setValue(this.defaultUnit?._id!)
      },
    });

    this.unitService
      .getUnits()
      .pipe(untilDestroyed(this))
      .subscribe((units) => {
        this.unitStore.setUnits(units);
      });

    this.unit.valueChanges.pipe(untilDestroyed(this)).subscribe((unitId) => {
      // Emit or perform actions with the updated quantity data here
      if (unitId) {
        const unitData = this.units.find((x) => x._id === unitId);
        if (unitData) this.unitChanged.emit(unitData);
      }
    });
  }
}
