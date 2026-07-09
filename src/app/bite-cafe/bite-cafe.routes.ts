import { Routes } from '@angular/router';
import { BiteLayout } from './bite-layout';

export const BITE_ROUTES: Routes = [
  {
    path: '',
    component: BiteLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./bite-home').then(m => m.BiteHome),
        data: {
          seo: {
            title: 'BITE | Healthy Food & Coffee in Ohrid',
            description: 'Fresh salads, wraps, smoothies, specialty coffee, and fresh juices in Ohrid.',
            keywords: 'Bite Ohrid, healthy food Ohrid, coffee Ohrid, fresh juice, cafe Ohrid, healthy cafe',
            image: 'assets/bite-caffe/DSC_4526.jpg',
            themeColor: '#1f2a14'
          }
        }
      },
      {
        path: 'menu',
        loadComponent: () => import('./bite-menu').then(m => m.BiteMenu),
        data: {
          seo: {
            title: 'Menu | BITE Ohrid',
            description: 'Browse the full BITE menu — coffee, smoothies, salads, wraps, bowls, and more.',
            keywords: 'Bite menu, Ohrid cafe menu, healthy food menu',
            image: 'assets/bite-caffe/wPT_Avocado-salad.jpg',
            themeColor: '#1f2a14'
          }
        }
      }
    ]
  }
];