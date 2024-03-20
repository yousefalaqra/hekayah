import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'feeds-root',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatIconModule, RouterOutlet],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.scss',
})
export class FeedsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(routeId: string): void {
    this.router.navigate([`/feeds/${routeId}`]); // Route with ID parameter
  }
}
