import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent {
  showModal = false;

  openModal(): void {
    this.showModal = true;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const calendlyContainer = document.getElementById('calendly-inline-widget');
      if (calendlyContainer) {
        calendlyContainer.innerHTML = ''; // limpiar por si se reabre

        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/santiagoblues-app/30min',
          parentElement: calendlyContainer,
          prefill: {},
        });
      }
    }, 0);
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }
}
