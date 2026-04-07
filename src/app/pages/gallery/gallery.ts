import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ApartmentsService, Apartment } from '../../services/apartments.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

type ViewFilter = 'all' | 'lake' | 'mountain' | 'pool';
type CapacityFilter = 'all' | '2' | '3-4' | '5+';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  i18n = inject(I18nService);
  private aptService = inject(ApartmentsService);

  activeView = signal<ViewFilter>('all');
  activeCapacity = signal<CapacityFilter>('all');

  viewFilters: { key: ViewFilter; label: string; icon: string }[] = [
    { key: 'all', label: 'gallery.filterAll', icon: 'grid_view' },
    { key: 'lake', label: 'gallery.filterLake', icon: 'water' },
    { key: 'mountain', label: 'gallery.filterMountain', icon: 'landscape' },
    { key: 'pool', label: 'gallery.filterPool', icon: 'pool' },
  ];

  capacityFilters: { key: CapacityFilter; label: string; icon: string }[] = [
    { key: 'all', label: 'gallery.filterAll', icon: 'groups' },
    { key: '2', label: 'gallery.cap2', icon: 'person' },
    { key: '3-4', label: 'gallery.cap34', icon: 'group' },
    { key: '5+', label: 'gallery.cap5', icon: 'family_restroom' },
  ];

  private viewMap: Record<string, ViewFilter> = {
    'apt.view.lakeside': 'lake',
    'apt.view.lake': 'lake',
    'apt.view.mountain': 'mountain',
    'apt.view.poolLake': 'pool',
  };

  apartments = computed(() => {
    const view = this.activeView();
    const cap = this.activeCapacity();
    return this.aptService.apartments.filter(a => {
      if (view !== 'all' && this.viewMap[a.subtitle] !== view) return false;
      if (cap !== 'all' && !this.matchesCapacity(a, cap)) return false;
      return true;
    });
  });

  private matchesCapacity(apt: Apartment, cap: CapacityFilter): boolean {
    const max = this.parseMaxGuests(apt.guests);
    switch (cap) {
      case '2': return max <= 2;
      case '3-4': return max >= 3 && max <= 4;
      case '5+': return max >= 5;
      default: return true;
    }
  }

  private parseMaxGuests(guests: string): number {
    const parts = guests.split('-');
    return parseInt(parts[parts.length - 1], 10);
  }

  setView(key: ViewFilter) {
    this.activeView.set(key);
  }

  setCapacity(key: CapacityFilter) {
    this.activeCapacity.set(key);
  }
}
