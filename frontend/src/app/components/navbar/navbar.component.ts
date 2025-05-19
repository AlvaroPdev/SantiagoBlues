import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Contacto', path: '/contacto' }
  ];

  socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/santiagoblues' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/santiagoblues' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/santiagoblues' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/santiagoblues' }
  ];
  

  navLinks = [
    { label: 'Inicio', href: '#agendar' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
  ];
  
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
