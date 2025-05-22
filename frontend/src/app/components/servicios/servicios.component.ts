import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Servicio {
  titulo: string;
  icono: string;
  descripcion: string;
  caracteristicas: string[];
  descripcionDetallada: string;
  beneficios: string[];
  proceso: { numero: number; titulo: string; descripcion: string }[];
  razones: string[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  modalAbierto = false;
  servicioSeleccionado: Servicio | null = null;

  servicios: Servicio[] = [
    {
      titulo: 'Diseño Web',
      icono: 'fa-paint-brush',
      descripcion: 'Creamos sitios web modernos y atractivos que reflejan la identidad de tu marca.',
      caracteristicas: ['Diseño responsivo', 'Optimización SEO', 'Interfaz intuitiva'],
      descripcionDetallada: 'Nuestro servicio de diseño web combina creatividad y funcionalidad para crear experiencias digitales únicas que cautivan a tus visitantes.',
      beneficios: ['Mayor visibilidad en línea', 'Mejor experiencia de usuario', 'Conversión optimizada'],
      proceso: [
        { numero: 1, titulo: 'Análisis', descripcion: 'Estudiamos tus necesidades y objetivos' },
        { numero: 2, titulo: 'Diseño', descripcion: 'Creamos un diseño personalizado' },
        { numero: 3, titulo: 'Desarrollo', descripcion: 'Implementamos el diseño con las mejores prácticas' }
      ],
      razones: ['Equipo experto en diseño', 'Tecnologías modernas', 'Soporte continuo']
    },
    {
      titulo: 'Desarrollo de Aplicaciones',
      icono: 'fa-code',
      descripcion: 'Desarrollamos aplicaciones web y móviles a medida para tu negocio.',
      caracteristicas: ['Desarrollo personalizado', 'Tecnologías modernas', 'Escalabilidad'],
      descripcionDetallada: 'Creamos aplicaciones robustas y escalables que automatizan y optimizan tus procesos de negocio.',
      beneficios: ['Automatización de procesos', 'Mayor eficiencia', 'Reducción de costos'],
      proceso: [
        { numero: 1, titulo: 'Planificación', descripcion: 'Definimos objetivos y requerimientos' },
        { numero: 2, titulo: 'Desarrollo', descripcion: 'Implementamos la solución' },
        { numero: 3, titulo: 'Pruebas', descripcion: 'Aseguramos la calidad' }
      ],
      razones: ['Metodología ágil', 'Código limpio', 'Mantenimiento continuo']
    },
    {
      titulo: 'Marketing Digital',
      icono: 'fa-bullhorn',
      descripcion: 'Estrategias de marketing digital para aumentar tu presencia en línea.',
      caracteristicas: ['SEO y SEM', 'Redes sociales', 'Email marketing'],
      descripcionDetallada: 'Implementamos estrategias integrales de marketing digital para aumentar tu visibilidad y generar leads.',
      beneficios: ['Mayor alcance', 'Mejor ROI', 'Análisis detallado'],
      proceso: [
        { numero: 1, titulo: 'Análisis', descripcion: 'Estudiamos tu mercado objetivo' },
        { numero: 2, titulo: 'Estrategia', descripcion: 'Desarrollamos un plan personalizado' },
        { numero: 3, titulo: 'Implementación', descripcion: 'Ejecutamos la estrategia' }
      ],
      razones: ['Resultados medibles', 'Enfoque en ROI', 'Actualización constante']
    },
    {
      titulo: 'Consultoría IT',
      icono: 'fa-laptop',
      descripcion: 'Asesoramiento experto en tecnología para optimizar tu negocio.',
      caracteristicas: ['Análisis de procesos', 'Optimización', 'Seguridad'],
      descripcionDetallada: 'Proporcionamos asesoramiento estratégico para implementar y optimizar soluciones tecnológicas en tu empresa.',
      beneficios: ['Mejora de procesos', 'Reducción de costos', 'Mayor seguridad'],
      proceso: [
        { numero: 1, titulo: 'Diagnóstico', descripcion: 'Evaluamos tu situación actual' },
        { numero: 2, titulo: 'Planificación', descripcion: 'Desarrollamos un plan de acción' },
        { numero: 3, titulo: 'Implementación', descripcion: 'Ejecutamos las mejoras' }
      ],
      razones: ['Experiencia comprobada', 'Enfoque personalizado', 'Resultados garantizados']
    }
  ];

  abrirModal(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
    this.modalAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.servicioSeleccionado = null;
    document.body.style.overflow = 'auto';
  }

  contactar(): void {
    this.cerrarModal();
  }
}
