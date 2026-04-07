import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  imports: [],
  templateUrl: './image-modal.html',
  styleUrl: './image-modal.scss'
})
export class ImageModal {
  src = input<string>('');
  alt = input<string>('');
  closed = output<void>();

  close() {
    this.closed.emit();
  }

  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
