import { Component, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private readonly formspreeEndpoint = 'https://formspree.io/f/xzblrbbz';
  i18n = inject(I18nService);
  submitted = signal(false);
  submitting = signal(false);
  submitError = signal('');

  model = {
    name: '',
    email: '',
    message: ''
  };

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
        body: JSON.stringify(this.model)
      });

      if (!response.ok) {
        throw new Error(`Formspree request failed: ${response.status}`);
      }

      this.submitted.set(true);
      form.resetForm();
    } catch (error) {
      console.error('Contact form submission failed', error);
      this.submitError.set(this.i18n.lang() === 'en'
        ? 'Sending failed. Please try again later.'
        : 'Испраќањето не успеа. Обидете се повторно подоцна.');
    } finally {
      this.submitting.set(false);
    }
  }
}

