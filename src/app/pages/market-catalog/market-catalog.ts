import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { MarketProductsService, MarketProduct } from '../../services/market-products.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-market-catalog',
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './market-catalog.html',
  styleUrl: './market-catalog.scss'
})
export class MarketCatalog implements OnInit {
  i18n = inject(I18nService);
  private marketProductsService = inject(MarketProductsService);
  allProducts = signal<MarketProduct[]>([]);
  searchQuery = signal('');
  selectedCategory = signal('All');
  currentPage = signal(1);
  pageSize = 12;

  categories = computed(() => {
    const cats = new Set(this.allProducts().map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
  });

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    return this.allProducts().filter(p => {
      const matchesSearch = !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      const matchesCat = cat === 'All' || p.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.pageSize));

  async ngOnInit() {
    try {
      this.allProducts.set(await this.marketProductsService.loadProducts());
    } catch (error) {
      console.error('Failed to load market catalog from CSV', error);
      this.allProducts.set([]);
    }
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  onCategoryChange(cat: string) {
    this.selectedCategory.set(cat);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}

