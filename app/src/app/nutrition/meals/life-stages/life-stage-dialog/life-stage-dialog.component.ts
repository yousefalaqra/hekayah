import { Component, OnInit, Signal, signal } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
import { UnitType } from '../../../../models/unit';
import { MatSelectModule } from '@angular/material/select';
import { AgeRange, GestationStage, WorkLevel } from '../../../../models/life-stage';

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
  templateUrl: './life-stage-dialog.component.html',
  styleUrl: './life-stage-dialog.component.scss',
})
export class LifeStageDialogComponent implements OnInit {
  lifeStageForm = new FormGroup({
    name: new FormControl(''),
    nutritional_requirements: new FormControl(''),
    age_range: new FormControl('', Validators.required),
    work_level: new FormControl(WorkLevel),
    gestation_stage: new FormControl(GestationStage),
  });

  ageRanges: string[] = Object.values(AgeRange);
  workLevels: string[] = Object.values(WorkLevel);
  gestationStages: string[] = Object.values(GestationStage);

  constructor(private dialogRef: MatDialogRef<LifeStageDialogComponent>) {}

  ngOnInit(): void {}

  saveLifeStage(): void {
    this.dialogRef.close(this.lifeStageForm.value);
  }

  get name() {
    return this.lifeStageForm.controls['name'];
  }

  get ageRange() {
    return this.lifeStageForm.controls['age_range'];
  }

  get nutritionalRequirements() {
    return this.lifeStageForm.controls['nutritional_requirements'];
  }

  get workLevel() {
    return this.lifeStageForm.controls['work_level'];
  }

  get gestationStage() {
    return this.lifeStageForm.controls['gestation_stage'];
  }
}
