import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ApartmentsService, Apartment } from '../../services/apartments.service';
import { ImageModal } from '../../components/image-modal/image-modal';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-apartment-detail',
  imports: [RouterLink, ImageModal, TranslatePipe],
  templateUrl: './apartment-detail.html',
  styleUrl: './apartment-detail.scss'
})
export class ApartmentDetail {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private aptService = inject(ApartmentsService);
  private seo = inject(SeoService);

  apartment: Apartment | undefined;
  modalImage = signal('');
  activeImage = signal(0);

  heroImage = computed(() => {
    if (!this.apartment) return '';
    return this.apartment.images[this.activeImage()];
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apartment = this.aptService.getById(id);
      if (this.apartment) {
        this.activeImage.set(0);
        this.seo.applySeo(
          {
            title: `${this.i18n.t(this.apartment.name)} | Park Diamond Apartments`,
            description: this.i18n.t(this.apartment.description),
            keywords: `Park Diamond, ${this.i18n.t(this.apartment.name)}, Ohrid apartment, ${this.i18n.t(this.apartment.subtitle)}`,
            image: this.apartment.images[0],
            type: 'article'
          },
          `/gallery/${this.apartment.id}`
        );
      }
    }
  }

  selectImage(index: number) {
    this.activeImage.set(index);
  }

  openModal(src: string) {
    this.modalImage.set(src);
  }

  closeModal() {
    this.modalImage.set('');
  }

  nextImage() {
    if (!this.apartment) return;
    const next = (this.activeImage() + 1) % this.apartment.images.length;
    this.activeImage.set(next);
  }

  prevImage() {
    if (!this.apartment) return;
    const prev = (this.activeImage() - 1 + this.apartment.images.length) % this.apartment.images.length;
    this.activeImage.set(prev);
  }
}

