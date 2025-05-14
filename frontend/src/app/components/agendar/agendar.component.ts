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
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  onButtonClick(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    button.blur(); // Remover el foco después del clic
  }
}
