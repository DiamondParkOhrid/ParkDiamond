import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { MarketProductsService, MarketProduct } from '../../services/market-products.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-market',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './market.html',
  styleUrl: './market.scss'
})
export class Market implements OnInit {
  i18n = inject(I18nService);
  private marketProductsService = inject(MarketProductsService);

  featuredProducts: MarketProduct[] = [];

  async ngOnInit() {
    try {
      const products = await this.marketProductsService.loadProducts();
      this.featuredProducts = products.slice(0, 3);
    } catch (error) {
      console.error('Failed to load featured products from CSV', error);
      this.featuredProducts = [];
    }
  }
}

