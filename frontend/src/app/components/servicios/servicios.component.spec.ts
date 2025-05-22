import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosComponent } from './servicios.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with modal closed and no selected service', () => {
    expect(component.modalAbierto).toBeFalse();
    expect(component.servicioSeleccionado).toBeNull();
  });

  it('should have four services defined', () => {
    expect(component.servicios.length).toBe(4);
    expect(component.servicios[0].titulo).toBe('Sitios Web');
    expect(component.servicios[1].titulo).toBe('Gestión Mensual Web');
    expect(component.servicios[2].titulo).toBe('Publicidad Digital');
    expect(component.servicios[3].titulo).toBe('Auditoría SEO');
  });

  it('should open modal and set selected service when abrirModal is called', () => {
    const servicio = component.servicios[0];
    component.abrirModal(servicio);
    
    expect(component.modalAbierto).toBeTrue();
    expect(component.servicioSeleccionado).toBe(servicio);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close modal and clear selected service when cerrarModal is called', () => {
    // Primero abrimos el modal
    const servicio = component.servicios[0];
    component.abrirModal(servicio);
    
    // Luego lo cerramos
    component.cerrarModal();
    
    expect(component.modalAbierto).toBeFalse();
    expect(component.servicioSeleccionado).toBeNull();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should close modal when contactar is called', () => {
    // Primero abrimos el modal
    const servicio = component.servicios[0];
    component.abrirModal(servicio);
    
    // Llamamos a contactar
    component.contactar();
    
    expect(component.modalAbierto).toBeFalse();
    expect(component.servicioSeleccionado).toBeNull();
  });

  it('should render all services in the template', () => {
    const compiled = fixture.nativeElement;
    const serviceElements = compiled.querySelectorAll('.servicio-card');
    expect(serviceElements.length).toBe(4);
  });

  it('should display service details correctly', () => {
    const compiled = fixture.nativeElement;
    const firstService = compiled.querySelector('.servicio-card');
    
    expect(firstService.querySelector('h3').textContent.trim()).toBe('Sitios Web');
    expect(firstService.querySelector('.servicio-descripcion').textContent.trim())
      .toContain('Diseño y desarrollo de sitios web modernos y responsivos');
  });

  it('should have correct number of features for each service', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.caracteristicas.length).toBe(4);
    });
  });

  it('should have correct number of benefits for each service', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.beneficios.length).toBe(4);
    });
  });

  it('should have correct number of process steps for each service', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.proceso.length).toBe(4);
    });
  });

  it('should have correct number of reasons for each service', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.razones.length).toBe(4);
    });
  });

  it('should have valid icons for all services', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.icono).toMatch(/^fa-/);
    });
  });

  it('should have detailed descriptions for all services', () => {
    component.servicios.forEach(servicio => {
      expect(servicio.descripcionDetallada.length).toBeGreaterThan(0);
    });
  });
});
