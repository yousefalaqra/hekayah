import { Component, OnInit, Signal, signal } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'brands-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './brand-dialog.component.html',
  styleUrl: './brand-dialog.component.scss',
})
export class BrandDialogComponent implements OnInit {
  
  brandName = new FormControl('', Validators.required);

  constructor(
    private dialogRef: MatDialogRef<BrandDialogComponent>,
  ) {}

  ngOnInit(): void {    
  }

  onSave(): void{
    this.dialogRef.close(this.brandName.value);
  }

}
