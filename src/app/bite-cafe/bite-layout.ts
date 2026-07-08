import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
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
  isScrolled = signal(false);
  tabHidden = signal(false);
  currentYear = new Date().getFullYear();

  private lenis: any;
  private rafId = 0;
  private lastScrollY = 0;
  private scrollThreshold = 80;
  private originalFavicon = '';
  private originalBodyBg = '';

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
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
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
