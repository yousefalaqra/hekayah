import { Component, OnInit, Signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { LifeStage, LifeStageModel } from '../../models/life-stage';
import { LifeStageService } from '../../services/life-stage.service';
import { LifeStageStore } from '../../store/life-stage.store';
import { LifeStageDialogComponent } from './life-stage-dialog/life-stage-dialog.component';

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
  providers: [LifeStageService, LifeStageStore],
  templateUrl: './life-stages.component.html',
  styleUrl: './life-stages.component.scss',
})
export class LifeStagessComponent implements OnInit {
  $lifeStages: Signal<Array<LifeStage>> = this.lifeStageStore.$lifeStages;

  private recentCreatedUnitId = '';

  constructor(
    private lifeStageService: LifeStageService,
    private lifeStageStore: LifeStageStore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lifeStageService
      .getLifeStages()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (lifeStages) => this.lifeStageStore.setLifeStages(lifeStages),
        error: (err) => console.log(err),
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LifeStageDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .pipe(
        switchMap((lifeStage: LifeStageModel) => {
          this.recentCreatedUnitId = this.lifeStageStore.addLifeStage(lifeStage);
          return this.lifeStageService.createLifeStage(lifeStage);
        })
      )
      .subscribe({
        next: (lifeStage) =>
          this.lifeStageStore.addLifeStageSuccess(this.recentCreatedUnitId, lifeStage),
        error: (err) =>
          this.lifeStageStore.addLifeStageFailure(this.recentCreatedUnitId),
      });
  }
}
