import { Component, ElementRef, inject, signal, afterNextRender, OnDestroy } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: { mk: string; en: string };
  description?: { mk: string; en: string } | null;
  price: string;
}

interface MenuCategory {
  category: { mk: string; en: string };
  category_notes?: { mk: string; en: string }[];
  items: MenuItem[];
  addons?: MenuItem[];
}

interface MenuData {
  restaurant: {
    name: string;
    description: string;
    global_notes: { mk: string; en: string }[];
  };
  menu: MenuCategory[];
}

@Component({
  selector: 'bite-menu',
  imports: [TranslatePipe],
  templateUrl: './bite-menu.html',
  styleUrl: './bite-menu.scss'
})
export class BiteMenu implements OnDestroy {
  i18n = inject(I18nService);
  private el = inject(ElementRef);
  private ctx!: gsap.Context;

  menuData = signal<MenuData | null>(null);
  activeCategory = signal(0);

  categoryImages: Record<string, string> = {
    'COFFEE': 'assets/bite-caffe/1783260977361443.jpg',
    'SALADS': 'assets/bite-caffe/wPT_Avocado-salad.jpg',
    'SANDWICHES': 'assets/bite-caffe/pesto mocarela sendvic.jpg',
    'WRAPS': 'assets/bite-caffe/wPT_Chicken-wrap.jpg',
    'BOWLS': 'assets/bite-caffe/DSC_4477.jpg',
  };

  sectionBreaks: Record<string, { en: string; mk: string }> = {
    'COFFEE': { en: 'Drinks', mk: 'Пијалоци' },
    'PROTEIN SMOOTHIE (250ml)': { en: 'Blended', mk: 'Блендирано' },
    'OAT MEAL': { en: 'Food', mk: 'Храна' },
    'ADDONS': { en: 'Extras', mk: 'Додатоци' },
  };

  constructor() {
    afterNextRender(async () => {
      await this.loadMenu();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.initAnimations());
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }

  private async loadMenu() {
    const res = await fetch('assets/bite-caffe/menu/menu-bite.json');
    const data: MenuData = await res.json();
    this.menuData.set(data);
  }

  scrollToCategory(index: number) {
    const el = this.el.nativeElement.querySelector(`#cat-${index}`);
    if (el) {
      // Account for sticky pills height (~50px) only
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    const pill = this.el.nativeElement.querySelector(`#pill-${index}`);
    pill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  getCategoryImage(cat: MenuCategory): string | null {
    return this.categoryImages[cat.category.en] || null;
  }

  getSectionBreak(cat: MenuCategory): { en: string; mk: string } | null {
    return this.sectionBreaks[cat.category.en] || null;
  }

  t(obj: { mk: string; en: string }): string {
    return this.i18n.lang() === 'mk' ? obj.mk : obj.en;
  }

  tDesc(obj: { mk: string; en: string } | null | undefined): string {
    if (!obj) return '';
    return this.i18n.lang() === 'mk' ? obj.mk : obj.en;
  }

  private initAnimations() {
    const root = this.el.nativeElement;

    this.ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.menu-hero__content', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
      });

      // Category sections — subtle fade in
      root.querySelectorAll('.menu-category').forEach((cat: Element) => {
        gsap.from(cat, {
          scrollTrigger: { trigger: cat, start: 'top 90%' },
          opacity: 0, y: 20, duration: 0.5, ease: 'power3.out',
        });
      });

      // Section dividers
      root.querySelectorAll('.menu-divider').forEach((div: Element) => {
        gsap.from(div, {
          scrollTrigger: { trigger: div, start: 'top 92%' },
          opacity: 0, scaleX: 0.3, duration: 0.7, ease: 'power3.out',
        });
      });

      // Category images
      root.querySelectorAll('.menu-category__img').forEach((img: Element) => {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 88%' },
          opacity: 0, scale: 0.96, duration: 0.7, ease: 'power3.out',
        });
      });

      // Active category tracking via ScrollTrigger
      root.querySelectorAll('.menu-category').forEach((cat: Element, i: number) => {
        ScrollTrigger.create({
          trigger: cat,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => this.setActive(i),
          onEnterBack: () => this.setActive(i),
        });
      });
    }, root);
  }

  private setActive(index: number) {
    this.activeCategory.set(index);
    const pill = this.el.nativeElement.querySelector(`#pill-${index}`);
    pill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}
