import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContactoComponent } from './contacto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactoComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.contactForm.get('nombre')?.value).toBe('');
    expect(component.contactForm.get('empresa')?.value).toBe('');
    expect(component.contactForm.get('web')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('telefono')?.value).toBe('');
    expect(component.contactForm.get('mensaje')?.value).toBe('');
  });

  it('should initialize with empty success and error messages', () => {
    expect(component.mensajeExito).toBe('');
    expect(component.mensajeError).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.contactForm;
    
    expect(form.valid).toBeFalsy();
    expect(form.get('nombre')?.errors?.['required']).toBeTruthy();
    expect(form.get('empresa')?.errors?.['required']).toBeTruthy();
    expect(form.get('web')?.errors?.['required']).toBeTruthy();
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
    expect(form.get('mensaje')?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors?.['email']).toBeFalsy();
  });

  it('should enable submit button when form is valid', () => {
    const form = component.contactForm;
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.submit-button');
    
    expect(submitButton.disabled).toBeTruthy();
    
    form.patchValue({
      nombre: 'Test User',
      empresa: 'Test Company',
      web: 'www.test.com',
      email: 'test@test.com',
      mensaje: 'Test message'
    });
    
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should submit form and show success message', fakeAsync(() => {
    const form = component.contactForm;
    form.patchValue({
      nombre: 'Test User',
      empresa: 'Test Company',
      web: 'www.test.com',
      email: 'test@test.com',
      mensaje: 'Test message'
    });

    component.onSubmit();
    
    const req = httpMock.expectOne('http://localhost:3000/contacto');
    expect(req.request.method).toBe('POST');
    req.flush({});
    
    tick();
    fixture.detectChanges();
    
    expect(component.mensajeExito).toBe('Mensaje enviado con éxito.');
    expect(component.mensajeError).toBe('');
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('empresa')?.value).toBe('');
    expect(form.get('web')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('telefono')?.value).toBe('');
    expect(form.get('mensaje')?.value).toBe('');
  }));

  it('should show error message on failed submission', fakeAsync(() => {
    const form = component.contactForm;
    form.patchValue({
      nombre: 'Test User',
      empresa: 'Test Company',
      web: 'www.test.com',
      email: 'test@test.com',
      mensaje: 'Test message'
    });

    component.onSubmit();
    
    const req = httpMock.expectOne('http://localhost:3000/contacto');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
    
    tick();
    fixture.detectChanges();
    
    expect(component.mensajeError).toBe('Error al enviar el mensaje.');
    expect(component.mensajeExito).toBe('');
  }));

  it('should render all form fields', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('#nombre')).toBeTruthy();
    expect(compiled.querySelector('#empresa')).toBeTruthy();
    expect(compiled.querySelector('#web')).toBeTruthy();
    expect(compiled.querySelector('#email')).toBeTruthy();
    expect(compiled.querySelector('#telefono')).toBeTruthy();
    expect(compiled.querySelector('#mensaje')).toBeTruthy();
  });

  it('should render section title and description', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.section-title').textContent.trim())
      .toBe('¿Listo para Transformar tu Negocio?');
    expect(compiled.querySelector('.section-description').textContent.trim())
      .toContain('En SantiagoBlues, estamos comprometidos con tu éxito digital');
  });

  it('should have correct section ID', () => {
    const compiled = fixture.nativeElement;
    const section = compiled.querySelector('section');
    expect(section.id).toBe('contacto');
  });
});
