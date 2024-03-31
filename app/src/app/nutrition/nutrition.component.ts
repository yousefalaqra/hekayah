import { Component, OnInit, Signal, signal } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@UntilDestroy()
@Component({
  selector: 'nutrition-root',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterOutlet, MatMenuModule],
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.scss',
})
export class NutritionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(routeId: string): void {
    this.router.navigate([`/nutrition/${routeId}`]); // Route with ID parameter
  }
}
