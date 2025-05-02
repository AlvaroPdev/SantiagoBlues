import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/santiagoblues' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/santiagoblues' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/santiagoblues' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/santiagoblues' }
  ];
}
