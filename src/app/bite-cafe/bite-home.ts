import { Component, ElementRef, inject, afterNextRender, OnDestroy, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Story {
  id: string;
  thumb: string;
  video: string;
  label: { en: string; mk: string };
  caption: { en: string; mk: string };
}

@Component({
  selector: 'bite-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './bite-home.html',
  styleUrl: './bite-home.scss'
})
export class BiteHome implements OnDestroy {
  i18n = inject(I18nService);
  private el = inject(ElementRef);
  private ctx!: gsap.Context;

  @ViewChild('storyVideo') storyVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('introCarousel') introCarouselRef!: ElementRef<HTMLElement>;

  // ── Intro carousel ──
  activeCard = signal(0);
  private cardCount = 3;
  private cardTimer: ReturnType<typeof setInterval> | null = null;
  private cardAutoDelay = 4000;

  // ── Stories ──
  stories: Story[] = [
    {
      id: 'salads',
      thumb: 'assets/bite-caffe/wPT_Avocado-salad.jpg',
      video: 'assets/bite-caffe/18.05.mp4',
      label: { en: 'Fresh Salads', mk: 'Свежи салати' },
      caption: { en: 'Crisp, colorful, and made with local ingredients.', mk: 'Свежи, шарени и направени со локални состојки.' },
    },
    {
      id: 'tiramisu',
      thumb: 'assets/bite-caffe/wPT_Tiramisu-coffe.jpg',
      video: 'assets/bite-caffe/tiramisu 1.mp4',
      label: { en: 'Tiramisu Drink', mk: 'Тирамису пијалок' },
      caption: { en: 'Our signature tiramisu drink — dessert in a glass.', mk: 'Нашиот тирамису пијалок — десерт во чаша.' },
    },
    {
      id: 'chia',
      thumb: 'assets/bite-caffe/wPT_Parfait-chia.jpg',
      video: 'assets/bite-caffe/18.06.mp4',
      label: { en: 'Chia Bowls', mk: 'Чиа чинии' },
      caption: { en: 'Chia pudding topped with fresh fruit and granola.', mk: 'Чиа пудинг со свежо овошје и гранола.' },
    },
    {
      id: 'coffee',
      thumb: 'assets/bite-caffe/viber_image_2026-07-05_16-18-10-885.jpg',
      video: 'assets/bite-caffe/coffee-story.mp4',
      label: { en: 'Coffee Time', mk: 'Време за кафе' },
      caption: { en: 'When coffee hits different. Every. Single. Time.', mk: 'Кога кафето удира поинаку. Секој. Пат.' },
    },
  ];

  storyOpen = signal(false);
  activeStory = signal(0);
  storyDuration = signal(8000);
  private storyTimer: ReturnType<typeof setTimeout> | null = null;

  t(obj: { mk: string; en: string }): string {
    return this.i18n.lang() === 'mk' ? obj.mk : obj.en;
  }

  goToCard(index: number) {
    this.activeCard.set(index);
    this.scrollToCard(index);
    this.restartCardTimer();
  }

  private scrollToCard(index: number) {
    const carousel = this.introCarouselRef?.nativeElement;
    if (!carousel) return;
    const track = carousel.querySelector('.intro__track') as HTMLElement;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    const trackPadding = 20;
    const scrollLeft = card.offsetLeft - trackPadding;
    track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }

  private startCardAutoScroll() {
    this.cardTimer = setInterval(() => {
      const next = (this.activeCard() + 1) % this.cardCount;
      this.activeCard.set(next);
      this.scrollToCard(next);
    }, this.cardAutoDelay);
  }

  private restartCardTimer() {
    if (this.cardTimer) clearInterval(this.cardTimer);
    this.startCardAutoScroll();
  }

  private setupCardScrollSync() {
    const carousel = this.introCarouselRef?.nativeElement;
    if (!carousel) return;
    const track = carousel.querySelector('.intro__track') as HTMLElement;
    if (!track) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    track.addEventListener('scroll', () => {
      // Pause auto-scroll while user is swiping
      if (this.cardTimer) clearInterval(this.cardTimer);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Detect which card is centered
        const center = track.scrollLeft + track.offsetWidth / 2;
        for (let i = 0; i < track.children.length; i++) {
          const child = track.children[i] as HTMLElement;
          if (center >= child.offsetLeft && center < child.offsetLeft + child.offsetWidth) {
            this.activeCard.set(i);
            break;
          }
        }
        this.startCardAutoScroll();
      }, 150);
    }, { passive: true });
  }

  private isAnimating = false;

  openStory(index: number) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.activeStory.set(index);
    this.storyOpen.set(true);
    document.body.style.overflow = 'hidden';

    // Animate in after DOM renders
    requestAnimationFrame(() => {
      const viewer = this.el.nativeElement.querySelector('.story-viewer');
      if (!viewer) { this.isAnimating = false; return; }

      const tl = gsap.timeline({
        onComplete: () => { this.isAnimating = false; this.startStoryTimer(); },
      });

      tl.fromTo(viewer, {
        opacity: 0,
        scale: 0.85,
        borderRadius: '50%',
        clipPath: 'circle(8% at 50% 50%)',
      }, {
        opacity: 1,
        scale: 1,
        borderRadius: '0%',
        clipPath: 'circle(100% at 50% 50%)',
        duration: 0.55,
        ease: 'power3.out',
      });

      // Stagger in the UI elements
      tl.from(viewer.querySelectorAll('.story-viewer__progress, .story-viewer__header, .story-viewer__caption'), {
        opacity: 0,
        y: -15,
        duration: 0.35,
        stagger: 0.06,
        ease: 'power2.out',
      }, '-=0.15');
    });
  }

  closeStory() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.clearStoryTimer();

    const viewer = this.el.nativeElement.querySelector('.story-viewer');
    if (!viewer) {
      this.storyOpen.set(false);
      document.body.style.overflow = '';
      this.isAnimating = false;
      return;
    }

    gsap.to(viewer, {
      opacity: 0,
      scale: 0.88,
      clipPath: 'circle(5% at 50% 50%)',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        this.storyOpen.set(false);
        document.body.style.overflow = '';
        this.isAnimating = false;
      },
    });
  }

  nextStory() {
    const next = this.activeStory() + 1;
    if (next >= this.stories.length) {
      this.closeStory();
    } else {
      this.activeStory.set(next);
      this.playCurrentVideo();
      this.startStoryTimer();
    }
  }

  prevStory() {
    const prev = this.activeStory() - 1;
    if (prev < 0) {
      // Restart current
      this.playCurrentVideo();
      this.startStoryTimer();
    } else {
      this.activeStory.set(prev);
      this.playCurrentVideo();
      this.startStoryTimer();
    }
  }

  onStoryEnded() {
    this.nextStory();
  }

  private playCurrentVideo() {
    // Small delay for DOM to update with new src
    setTimeout(() => {
      const video = this.el.nativeElement.querySelector('.story-viewer__video') as HTMLVideoElement;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }, 50);
  }

  private startStoryTimer() {
    this.clearStoryTimer();
    // Get video duration once loaded, fallback to 8s
    setTimeout(() => {
      const video = this.el.nativeElement.querySelector('.story-viewer__video') as HTMLVideoElement;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        const setDuration = () => {
          if (video.duration && isFinite(video.duration)) {
            this.storyDuration.set(video.duration * 1000);
            this.storyTimer = setTimeout(() => this.nextStory(), video.duration * 1000);
          } else {
            this.storyDuration.set(8000);
            this.storyTimer = setTimeout(() => this.nextStory(), 8000);
          }
        };
        if (video.readyState >= 1) {
          setDuration();
        } else {
          video.addEventListener('loadedmetadata', setDuration, { once: true });
        }
      }
    }, 50);
  }

  private clearStoryTimer() {
    if (this.storyTimer) {
      clearTimeout(this.storyTimer);
      this.storyTimer = null;
    }
  }

  constructor() {
    afterNextRender(() => {
      this.initAnimations();
      if (window.innerWidth < 768) {
        this.setupCardScrollSync();
        this.startCardAutoScroll();
      }
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.clearStoryTimer();
    if (this.cardTimer) clearInterval(this.cardTimer);
    document.body.style.overflow = '';
  }

  private initAnimations() {
    const root = this.el.nativeElement;
    const isMobile = window.innerWidth < 768;

    this.ctx = gsap.context(() => {
      // ── Hero entrance ──
      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } });
      hero
        .from('.hero__logo', { opacity: 0, scale: 0.85, duration: 1.2 })
        .from('.hero__headline', { opacity: 0, y: isMobile ? 30 : 60, duration: 1 }, '-=0.6')
        .from('.hero__tagline', { opacity: 0, y: isMobile ? 15 : 30, duration: 0.8 }, '-=0.5')
        .from('.hero__pill', { opacity: 0, y: 12, scale: 0.9, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .from('.hero__cta', { opacity: 0, y: 15, duration: 0.6 }, '-=0.2')
        .from('.hero__scroll', { opacity: 0, y: -8, duration: 0.7 }, '-=0.1');

      // ── Hero parallax ──
      gsap.to('.hero__bg img', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: isMobile ? 40 : 100, ease: 'none',
      });

      gsap.to('.hero__overlay', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        opacity: 0.9,
      });

      // ── Stories entrance ──
      gsap.from('.stories__thumb', {
        scrollTrigger: { trigger: '.stories', start: 'top 90%' },
        opacity: 0, y: 20, scale: 0.8, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
      });

      // ── Intro ──
      gsap.from('.intro__eyebrow', {
        scrollTrigger: { trigger: '.intro', start: 'top 85%' },
        opacity: 0, y: 15, duration: 0.6,
      });
      gsap.from('.intro__title', {
        scrollTrigger: { trigger: '.intro', start: 'top 83%' },
        opacity: 0, y: isMobile ? 20 : 40, duration: 0.8, delay: 0.1,
      });
      gsap.from('.intro__desc', {
        scrollTrigger: { trigger: '.intro', start: 'top 80%' },
        opacity: 0, y: isMobile ? 15 : 30, duration: 0.7, delay: 0.15,
      });

      gsap.from('.intro__card', {
        scrollTrigger: { trigger: '.intro__carousel', start: 'top 85%', once: true },
        opacity: 0, y: isMobile ? 30 : 70, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        clearProps: 'all',
      });

      // ── Gallery ──
      gsap.from('.gallery__item', {
        scrollTrigger: { trigger: '.gallery', start: 'top 85%' },
        opacity: 0, y: isMobile ? 25 : 50, scale: 0.97, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      });

      // ── Wolt ──
      gsap.from('.wolt__inner', {
        scrollTrigger: { trigger: '.wolt', start: 'top 85%' },
        opacity: 0, y: isMobile ? 20 : 40, duration: 0.7, ease: 'power3.out',
      });

      // ── Find Us ──
      gsap.from('.findus__info', {
        scrollTrigger: { trigger: '.findus', start: 'top 85%' },
        opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 30 : 0, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.findus__map', {
        scrollTrigger: { trigger: '.findus', start: 'top 80%' },
        opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 30 : 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
      });

      // ── CTA ──
      gsap.to('.cta__bg img', {
        scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: isMobile ? -30 : -80, ease: 'none',
      });
      gsap.from('.cta__content', {
        scrollTrigger: { trigger: '.cta', start: 'top 75%' },
        opacity: 0, y: isMobile ? 25 : 50, duration: 0.9, ease: 'power3.out',
      });
    }, root);
  }
}
