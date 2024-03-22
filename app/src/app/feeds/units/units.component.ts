import { Component, OnInit, Signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';
import { UnitStore } from '../../store/unit.store';
import { UnitService } from '../../services/unit.service';

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
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Unit, UnitModel, UnitType } from '../../models/unit';
import { UnitDialogComponent } from './unit-dialog/unit-dialog.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';

@UntilDestroy()
@Component({
  selector: 'brands-root',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    MatDividerModule,
  ],
  providers: [UnitService, UnitStore],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
})
export class UnitsComponent implements OnInit {
  $units: Signal<Array<Unit>> = this.unitStore.units;
  $volumeUnits = this.unitStore.$volumeUnits
  $weightUnits = this.unitStore.$weightUnits

  private recentCreatedUnitId = '';

  constructor(
    private unitService: UnitService,
    private unitStore: UnitStore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.unitService
      .getUnits()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (units) => this.unitStore.setUnits(units),
        error: (err) => console.log(err),
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UnitDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .pipe(
        switchMap((unit: UnitModel) => {
          this.recentCreatedUnitId = this.unitStore.addUnit(unit);
          return this.unitService.createUnit(unit);
        })
      )
      .subscribe({
        next: (unit) =>
          this.unitStore.confirmCreateBrand(this.recentCreatedUnitId, unit),
        error: (err) =>
          this.unitStore.cancleCreateBrand(this.recentCreatedUnitId),
      });
  }
}
