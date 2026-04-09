import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { Navbar } from './components/navbar/navbar';
import { BottomNav } from './components/bottom-nav/bottom-nav';
import { Footer } from './components/footer/footer';
import { SeoConfig, SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BottomNav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);

  showSplash = signal(true);

  ngOnInit() {
    const duration = 400 + Math.random() * 900;
    setTimeout(() => this.showSplash.set(false), duration);
  }

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const deepest = this.getDeepestRoute(this.route);
        const routeSeo = deepest.snapshot.data['seo'] as SeoConfig | undefined;
        const path = this.router.url.split('?')[0] || '/';

        this.seo.applySeo(
          routeSeo ?? {
            title: 'Park Diamond Apartments',
            description: 'Park Diamond Apartments in Ohrid.'
          },
          path
        );
      });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
