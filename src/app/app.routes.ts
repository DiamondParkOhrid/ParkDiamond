import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    data: {
      seo: {
        title: 'Park Diamond Apartments | Ohrid',
        description: 'Modern apartments in Ohrid with lake and mountain views, pool access, and private parking.',
        keywords: 'Park Diamond, Ohrid apartments, lake view accommodation, North Macedonia'
      }
    }
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery').then(m => m.Gallery),
    data: {
      seo: {
        title: 'Gallery | Park Diamond Apartments',
        description: 'Browse apartment photos and discover interiors, amenities, and views at Park Diamond.',
        keywords: 'Park Diamond gallery, apartment photos, Ohrid stay'
      }
    }
  },
  {
    path: 'gallery/:id',
    loadComponent: () => import('./pages/apartment-detail/apartment-detail').then(m => m.ApartmentDetail),
    data: {
      seo: {
        title: 'Apartment Details | Park Diamond Apartments',
        description: 'See apartment details, amenities, and booking information at Park Diamond Apartments.',
        keywords: 'apartment details, Park Diamond, Ohrid'
      }
    }
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking').then(m => m.Booking),
    data: {
      seo: {
        title: 'Book Your Stay | Park Diamond Apartments',
        description: 'Submit a booking request for your next stay at Park Diamond Apartments in Ohrid.',
        keywords: 'book apartment Ohrid, Park Diamond booking'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    data: {
      seo: {
        title: 'Contact | Park Diamond Apartments',
        description: 'Get in touch with Park Diamond Apartments for reservations, directions, and support.',
        keywords: 'contact Park Diamond, Ohrid accommodation contact'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: {
      seo: {
        title: 'About Us | Park Diamond Apartments',
        description: 'Learn about Park Diamond Apartments and the experience we provide in Ohrid.',
        keywords: 'about Park Diamond, apartments Ohrid'
      }
    }
  },
  {
    path: 'market',
    loadComponent: () => import('./pages/market/market').then(m => m.Market),
    data: {
      seo: {
        title: 'Diamond Market | Park Diamond',
        description: 'Explore Diamond Market products and everyday essentials available near your stay.',
        keywords: 'Diamond Market, Ohrid market, Park Diamond shop'
      }
    }
  },
  {
    path: 'market/catalog',
    loadComponent: () => import('./pages/market-catalog/market-catalog').then(m => m.MarketCatalog),
    data: {
      seo: {
        title: 'Market Catalog | Diamond Market',
        description: 'Browse the full Diamond Market catalog with categories, search, and pricing.',
        keywords: 'market catalog, Diamond Market products, Ohrid grocery'
      }
    }
  },
  { path: '**', redirectTo: '' }
];
