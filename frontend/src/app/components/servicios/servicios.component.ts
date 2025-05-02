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
      titulo: 'Sitios Web',
      icono: 'fa-laptop-code',
      descripcion: 'Diseño y desarrollo de sitios web modernos y responsivos',
      caracteristicas: [
        'Diseño personalizado',
        'Optimización SEO',
        'Responsive Design',
        'Integración de redes sociales'
      ],
      descripcionDetallada: 'Creamos sitios web que no solo se ven bien, sino que también funcionan perfectamente. Nuestro enfoque combina diseño atractivo con funcionalidad robusta, asegurando una experiencia de usuario excepcional.',
      beneficios: [
        'Mayor visibilidad en línea',
        'Mejor experiencia de usuario',
        'Optimización para motores de búsqueda',
        'Diseño adaptable a todos los dispositivos'
      ],
      proceso: [
        {
          numero: 1,
          titulo: 'Análisis y Planificación',
          descripcion: 'Entendemos tus necesidades y objetivos para crear una estrategia efectiva.'
        },
        {
          numero: 2,
          titulo: 'Diseño',
          descripcion: 'Creamos un diseño único que refleja la identidad de tu marca.'
        },
        {
          numero: 3,
          titulo: 'Desarrollo',
          descripcion: 'Implementamos el diseño con las últimas tecnologías web.'
        },
        {
          numero: 4,
          titulo: 'Pruebas y Optimización',
          descripcion: 'Aseguramos que todo funcione perfectamente en todos los dispositivos.'
        }
      ],
      razones: [
        'Equipo de expertos en desarrollo web',
        'Tecnologías de vanguardia',
        'Soporte continuo',
        'Resultados medibles'
      ]
    },
    {
      titulo: 'Gestión Mensual Web',
      icono: 'fa-cogs',
      descripcion: 'Mantenimiento y actualización constante de tu sitio web',
      caracteristicas: [
        'Actualizaciones regulares',
        'Monitoreo de seguridad',
        'Backups automáticos',
        'Soporte técnico'
      ],
      descripcionDetallada: 'Mantenemos tu sitio web actualizado, seguro y funcionando al máximo rendimiento. Nuestro servicio de gestión mensual te permite enfocarte en tu negocio mientras nosotros nos encargamos de tu presencia digital.',
      beneficios: [
        'Sitio web siempre actualizado',
        'Protección contra amenazas',
        'Mejor rendimiento',
        'Soporte técnico inmediato'
      ],
      proceso: [
        {
          numero: 1,
          titulo: 'Análisis Inicial',
          descripcion: 'Evaluamos el estado actual de tu sitio web.'
        },
        {
          numero: 2,
          titulo: 'Plan de Mantenimiento',
          descripcion: 'Creamos un plan personalizado para tu sitio.'
        },
        {
          numero: 3,
          titulo: 'Implementación',
          descripcion: 'Ejecutamos las actualizaciones y mejoras necesarias.'
        },
        {
          numero: 4,
          titulo: 'Monitoreo Continuo',
          descripcion: 'Vigilamos el rendimiento y seguridad de tu sitio.'
        }
      ],
      razones: [
        'Expertos en mantenimiento web',
        'Respuesta rápida a problemas',
        'Actualizaciones regulares',
        'Soporte personalizado'
      ]
    },
    {
      titulo: 'Publicidad Digital',
      icono: 'fa-bullhorn',
      descripcion: 'Campañas efectivas en Google Ads y Meta Ads',
      caracteristicas: [
        'Análisis de mercado',
        'Segmentación precisa',
        'Optimización constante',
        'Reportes detallados'
      ],
      descripcionDetallada: 'Maximizamos tu inversión en publicidad digital con campañas estratégicas en Google Ads y Meta Ads. Nuestro enfoque data-driven asegura resultados medibles y ROI positivo.',
      beneficios: [
        'Mayor visibilidad de marca',
        'Tráfico cualificado',
        'Conversiones optimizadas',
        'ROI medible'
      ],
      proceso: [
        {
          numero: 1,
          titulo: 'Investigación',
          descripcion: 'Analizamos tu mercado y competencia.'
        },
        {
          numero: 2,
          titulo: 'Estrategia',
          descripcion: 'Desarrollamos una estrategia de publicidad personalizada.'
        },
        {
          numero: 3,
          titulo: 'Implementación',
          descripcion: 'Lanzamos y optimizamos las campañas.'
        },
        {
          numero: 4,
          titulo: 'Análisis y Ajuste',
          descripcion: 'Monitoreamos resultados y ajustamos estrategias.'
        }
      ],
      razones: [
        'Certificados en Google Ads y Meta',
        'Enfoque en resultados',
        'Optimización constante',
        'Transparencia total'
      ]
    },
    {
      titulo: 'Auditoría SEO',
      icono: 'fa-search',
      descripcion: 'Análisis completo de tu sitio web y enlaces',
      caracteristicas: [
        'Análisis técnico',
        'Auditoría de contenido',
        'Revisión de backlinks',
        'Recomendaciones personalizadas'
      ],
      descripcionDetallada: 'Realizamos una auditoría exhaustiva de tu sitio web, identificando oportunidades de mejora en SEO y detectando enlaces tóxicos que puedan estar afectando tu posicionamiento.',
      beneficios: [
        'Mejor posicionamiento SEO',
        'Identificación de problemas',
        'Estrategia clara de mejora',
        'Protección contra penalizaciones'
      ],
      proceso: [
        {
          numero: 1,
          titulo: 'Análisis Técnico',
          descripcion: 'Evaluamos la estructura y rendimiento técnico.'
        },
        {
          numero: 2,
          titulo: 'Auditoría de Contenido',
          descripcion: 'Analizamos la calidad y optimización del contenido.'
        },
        {
          numero: 3,
          titulo: 'Revisión de Enlaces',
          descripcion: 'Identificamos enlaces tóxicos y oportunidades.'
        },
        {
          numero: 4,
          titulo: 'Reporte y Recomendaciones',
          descripcion: 'Proporcionamos un plan de acción detallado.'
        }
      ],
      razones: [
        'Expertos en SEO técnico',
        'Herramientas avanzadas',
        'Análisis exhaustivo',
        'Recomendaciones prácticas'
      ]
    }
  ];

  abrirModal(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
    this.modalAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.servicioSeleccionado = null;
    document.body.style.overflow = 'auto';
  }

  contactar() {
    this.cerrarModal();
    // Aquí podrías redirigir al formulario de contacto o abrir un modal de contacto
  }
}
