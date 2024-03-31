import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'meals-root',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatIconModule, RouterOutlet],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss',
})
export class MealsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(routeId: string): void {
    this.router.navigate([`/nutrition/meals/${routeId}`]); // Route with ID parameter
  }
}
