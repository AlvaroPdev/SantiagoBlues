import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct profile data', () => {
    expect(component.perfilData.nombre).toBe('Sergio Blues');
    expect(component.perfilData.especialidad).toBe('Desarrollo Web & Marketing Digital');
    expect(component.perfilData.experiencia).toBe('5+ años');
    expect(component.perfilData.avatar.src).toBe('../../../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg');
    expect(component.perfilData.avatar.alt).toBe('Placeholder Avatar');
  });

  it('should render profile container', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.perfil-container');
    expect(container).toBeTruthy();
  });

  it('should render avatar with correct attributes', () => {
    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.perfil-avatar img');
    
    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute('src')).toBe('../../../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg');
    expect(avatar.getAttribute('alt')).toBe('Placeholder Avatar');
  });

  it('should render profile information', () => {
    const compiled = fixture.nativeElement;
    const info = compiled.querySelector('.perfil-info');
    
    expect(info).toBeTruthy();
    expect(info.querySelector('h2').textContent.trim()).toBe('Sergio Blues');
    expect(info.querySelector('.perfil-especialidad').textContent.trim())
      .toBe('Desarrollo Web & Marketing Digital');
    expect(info.querySelector('.perfil-experiencia').textContent.trim())
      .toBe('Experiencia: 5+ años');
  });

  it('should have correct structure with avatar and info sections', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.perfil-container');
    
    expect(container.querySelector('.perfil-avatar')).toBeTruthy();
    expect(container.querySelector('.perfil-info')).toBeTruthy();
  });

  it('should have avatar before info section', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.perfil-container');
    const avatar = container.querySelector('.perfil-avatar');
    const info = container.querySelector('.perfil-info');
    
    expect(container.children[0]).toBe(avatar);
    expect(container.children[1]).toBe(info);
  });

  it('should have all required profile information elements', () => {
    const compiled = fixture.nativeElement;
    const info = compiled.querySelector('.perfil-info');
    
    expect(info.querySelector('h2')).toBeTruthy();
    expect(info.querySelector('.perfil-especialidad')).toBeTruthy();
    expect(info.querySelector('.perfil-experiencia')).toBeTruthy();
  });

  it('should have correct CSS classes', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.perfil-container')).toBeTruthy();
    expect(compiled.querySelector('.perfil-avatar')).toBeTruthy();
    expect(compiled.querySelector('.perfil-info')).toBeTruthy();
    expect(compiled.querySelector('.perfil-especialidad')).toBeTruthy();
    expect(compiled.querySelector('.perfil-experiencia')).toBeTruthy();
  });
});
