import { Component, OnInit, Signal, signal } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UnitType } from '../../../models/unit';
import { MatSelectModule } from '@angular/material/select';

@UntilDestroy()
@Component({
  selector: 'brands-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './unit-dialog.component.html',
  styleUrl: './unit-dialog.component.scss',
})
export class UnitDialogComponent implements OnInit {
  UnitType = UnitType;

  unitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required),
    type: new FormControl(UnitType, Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<UnitDialogComponent>) {}

  ngOnInit(): void {}

  saveUnit(): void {
    this.dialogRef.close(this.unitForm.value);
  }

  get name() {
    return this.unitForm.controls['name'];
  }

  get abbreviation() {
    return this.unitForm.controls['abbreviation'];
  }

  get type() {
    return this.unitForm.controls['type'];
  }
}
