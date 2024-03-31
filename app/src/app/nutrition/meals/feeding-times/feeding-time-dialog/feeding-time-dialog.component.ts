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
  templateUrl: './feeding-time-dialog.component.html',
  styleUrl: './feeding-time-dialog.component.scss',
})
export class FeedingTimeDialogComponent implements OnInit {

  feedignTimeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<FeedingTimeDialogComponent>) {}

  ngOnInit(): void {}

  saveUnit(): void {
    this.dialogRef.close(this.feedignTimeForm.value);
  }

  get name() {
    return this.feedignTimeForm.controls['name'];
  }

  get time() {
    return this.feedignTimeForm.controls['time'];
  }

}
