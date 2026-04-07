import { Component, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking {
  private readonly formspreeEndpoint = 'https://formspree.io/f/mgejkewk';
  i18n = inject(I18nService);
  guestCount = signal(2);
  submitted = signal(false);
  submitting = signal(false);
  submitError = signal('');

  model = {
    name: '',
    email: '',
    phone: '',
    guests: 2,
    checkin: '',
    checkout: '',
    request: ''
  };

  updateGuests(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    this.guestCount.set(val);
    this.model.guests = val;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid || this.submitting()) {
      return;
    }

    this.submitting.set(true);
    this.submitError.set('');

    try {
      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.model.name,
          email: this.model.email,
          phone: this.model.phone,
          guests: this.model.guests,
          checkin: this.model.checkin,
          checkout: this.model.checkout,
          message: this.model.request
        })
      });

      if (!response.ok) {
        throw new Error(`Formspree request failed: ${response.status}`);
      }

      this.submitted.set(true);
      form.resetForm();
      this.guestCount.set(2);
      this.model.guests = 2;
    } catch (error) {
      console.error('Booking form submission failed', error);
      this.submitError.set(this.i18n.lang() === 'en'
        ? 'Sending failed. Please try again or contact us by phone/Viber.'
        : 'Испраќањето не успеа. Обидете се повторно или контактирајте не по телефон/Viber.');
    } finally {
      this.submitting.set(false);
    }
  }
}

