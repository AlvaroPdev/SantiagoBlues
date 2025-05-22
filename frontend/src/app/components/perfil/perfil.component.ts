import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PerfilData {
  nombre: string;
  especialidad: string;
  experiencia: string;
  avatar: {
    src: string;
    alt: string;
  };
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  perfilData: PerfilData = {
    nombre: 'Sergio Blues',
    especialidad: 'Desarrollo Web & Marketing Digital',
    experiencia: '5+ años',
    avatar: {
      src: '../../../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg',
      alt: 'Placeholder Avatar'
    }
  };
}
