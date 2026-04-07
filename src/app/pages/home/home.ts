import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ApartmentsService } from '../../services/apartments.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  i18n = inject(I18nService);
  private aptService = inject(ApartmentsService);
  apartments = this.aptService.apartments.slice(0, 6);
}

