import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  themeColor?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'Park Diamond Apartments';
  private readonly defaultThemeColor = '#2f67e0';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  applySeo(config: SeoConfig, canonicalPath?: string): void {
    this.setTitle(config.title);
    this.setDescription(config.description);

    if (config.keywords) {
      this.setKeywords(config.keywords);
    }

    this.updateTag('property', 'og:title', config.title);
    this.updateTag('property', 'og:description', config.description);
    this.updateTag('property', 'og:type', config.type ?? 'website');
    this.updateTag('property', 'og:site_name', this.siteName);

    // Twitter Card
    this.updateTag('name', 'twitter:card', config.image ? 'summary_large_image' : 'summary');
    this.updateTag('name', 'twitter:title', config.title);
    this.updateTag('name', 'twitter:description', config.description);

    if (config.image) {
      const imageUrl = config.image.startsWith('http') ? config.image : this.toAbsoluteUrl(`/${config.image}`);
      this.updateTag('property', 'og:image', imageUrl);
      this.updateTag('name', 'twitter:image', imageUrl);
    }

    this.updateTag('name', 'theme-color', config.themeColor ?? this.defaultThemeColor);

    if (canonicalPath) {
      this.setCanonical(canonicalPath);
      this.updateTag('property', 'og:url', this.toAbsoluteUrl(canonicalPath));
    }
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  setCanonical(path: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const absoluteUrl = this.toAbsoluteUrl(path);
    const head = this.document.head;
    let canonical = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      head.appendChild(canonical);
    }

    canonical.setAttribute('href', absoluteUrl);
  }

  private updateTag(attribute: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attribute]: key, content });
  }

  private toAbsoluteUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (isPlatformBrowser(this.platformId)) {
      return `${window.location.origin}${normalizedPath}`;
    }

    return normalizedPath;
  }
}

