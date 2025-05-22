import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarComponent } from './agendar.component';

describe('AgendarComponent', () => {
  let component: AgendarComponent;
  let fixture: ComponentFixture<AgendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with modal closed', () => {
    expect(component.showModal).toBeFalse();
  });

  it('should open modal and set body overflow to hidden when openModal is called', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close modal and reset body overflow when closeModal is called', () => {
    // Primero abrimos el modal
    component.openModal();
    
    // Luego lo cerramos
    component.closeModal();
    
    expect(component.showModal).toBeFalse();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should remove focus from button after click', () => {
    const button = document.createElement('button');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    Object.defineProperty(event, 'currentTarget', { value: button });
    
    // Espiamos el método blur
    const blurSpy = spyOn(button, 'blur');
    
    // Llamar al método
    component.onButtonClick(event);
    
    // Verificar que blur fue llamado
    expect(blurSpy).toHaveBeenCalled();
  });

  it('should render the meeting intro section', () => {
    const compiled = fixture.nativeElement;
    const introSection = compiled.querySelector('.meeting-intro');
    
    expect(introSection).toBeTruthy();
    expect(introSection.querySelector('.intro-title').textContent.trim())
      .toBe('Impulsa tu presencia online');
    expect(introSection.querySelector('.intro-subtitle').textContent.trim())
      .toBe('Experto en estrategias digitales para tu negocio');
  });

  it('should render the schedule button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.schedule-button');
    
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Agendar Reunión');
  });

  it('should render the modal with Calendly iframe when opened', () => {
    // Abrir el modal
    component.openModal();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const modal = compiled.querySelector('.modal');
    const iframe = modal.querySelector('.calendly-iframe');
    
    expect(modal).toBeTruthy();
    expect(modal.classList.contains('show')).toBeTrue();
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toBe('https://calendly.com/santiagoblues-app/45min');
  });

  it('should close modal when close button is clicked', () => {
    // Abrir el modal
    component.openModal();
    fixture.detectChanges();
    
    // Hacer clic en el botón de cerrar
    const compiled = fixture.nativeElement;
    const closeButton = compiled.querySelector('.close');
    closeButton.click();
    fixture.detectChanges();
    
    // Verificar que el modal está cerrado
    const modal = compiled.querySelector('.modal');
    expect(modal.classList.contains('show')).toBeFalse();
  });

  it('should have correct container ID', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.container');
    expect(container.id).toBe('agendar');
  });
});
