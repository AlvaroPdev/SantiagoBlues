import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
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
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
