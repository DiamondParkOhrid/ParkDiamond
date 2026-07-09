import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { I18nService } from '../services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'bite-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './bite-layout.html',
  styleUrl: './bite-layout.scss'
})
export class BiteLayout implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  private router = inject(Router);
  isScrolled = signal(false);
  tabHidden = signal(false);
  showPhoneHint = signal(false);
  phoneHintClosing = signal(false);
  currentYear = new Date().getFullYear();

  private lenis: any;
  private rafId = 0;
  private routerSub?: Subscription;
  private lastScrollY = 0;
  private scrollThreshold = 80;
  private originalFavicon = '';
  private originalBodyBg = '';
  private phoneHintTimer: any;

  private onScroll = () => {
    const y = window.scrollY;
    this.isScrolled.set(y > 60);
    // Hide tab bar when scrolling down, show when scrolling up
    if (y > this.scrollThreshold && y > this.lastScrollY) {
      this.tabHidden.set(true);
    } else {
      this.tabHidden.set(false);
    }
    this.lastScrollY = y;
  };

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.initLenis();
    this.setBiteFavicon();
    this.phoneHintTimer = setTimeout(() => this.showPhoneHint.set(true), 3000);
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.lenis) {
          this.lenis.scrollTo(0, { immediate: false, duration: 0.8 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  dismissPhoneHint() {
    this.phoneHintClosing.set(true);
    setTimeout(() => {
      this.showPhoneHint.set(false);
      this.phoneHintClosing.set(false);
    }, 350);
  }

  ngOnDestroy() {
    clearTimeout(this.phoneHintTimer);
    window.removeEventListener('scroll', this.onScroll);
    this.routerSub?.unsubscribe();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.restoreFavicon();
  }

  private setBiteFavicon() {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      this.originalFavicon = link.href;
      link.href = 'assets/bite-caffe/logo.png';
    }
    this.originalBodyBg = document.body.style.background;
    document.body.style.background = '#151f0e';
  }

  private restoreFavicon() {
    if (this.originalFavicon) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (link) link.href = this.originalFavicon;
    }
    document.body.style.background = this.originalBodyBg;
  }

  private async initLenis() {
    const { default: Lenis } = await import('lenis');
    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);
  }
}
