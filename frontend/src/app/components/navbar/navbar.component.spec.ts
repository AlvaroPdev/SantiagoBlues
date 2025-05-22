import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isScrolled as false', () => {
    expect(component.isScrolled).toBeFalse();
  });

  it('should have correct menu items', () => {
    expect(component.menuItems.length).toBe(3);
    expect(component.menuItems[0].label).toBe('Agendar');
    expect(component.menuItems[1].label).toBe('Servicios');
    expect(component.menuItems[2].label).toBe('Contacto');
  });

  it('should have correct social links', () => {
    expect(component.socialLinks.length).toBe(4);
    expect(component.socialLinks[0].icon).toBe('fab fa-facebook-f');
    expect(component.socialLinks[1].icon).toBe('fab fa-instagram');
    expect(component.socialLinks[2].icon).toBe('fab fa-twitter');
    expect(component.socialLinks[3].icon).toBe('fab fa-youtube');
  });

  it('should have correct navigation links', () => {
    expect(component.navLinks.length).toBe(3);
    expect(component.navLinks[0].label).toBe('Agendar');
    expect(component.navLinks[1].label).toBe('Servicios');
    expect(component.navLinks[2].label).toBe('Contacto');
  });

  it('should update isScrolled when scrolling past threshold', () => {
    // Simulamos el scroll
    Object.defineProperty(window, 'scrollY', { value: 100 });
    component.onWindowScroll();
    expect(component.isScrolled).toBeTrue();

    // Simulamos volver arriba
    Object.defineProperty(window, 'scrollY', { value: 0 });
    component.onWindowScroll();
    expect(component.isScrolled).toBeFalse();
  });

  it('should have correct href values in navLinks', () => {
    expect(component.navLinks[0].href).toBe('#agendar');
    expect(component.navLinks[1].href).toBe('#servicios');
    expect(component.navLinks[2].href).toBe('#contacto');
  });

  it('should have correct paths in menuItems', () => {
    expect(component.menuItems[0].path).toBe('/');
    expect(component.menuItems[1].path).toBe('/servicios');
    expect(component.menuItems[2].path).toBe('/contacto');
  });

  it('should have correct social media URLs', () => {
    expect(component.socialLinks[0].url).toBe('https://facebook.com/santiagoblues');
    expect(component.socialLinks[1].url).toBe('https://instagram.com/santiagoblues');
    expect(component.socialLinks[2].url).toBe('https://twitter.com/santiagoblues');
    expect(component.socialLinks[3].url).toBe('https://youtube.com/santiagoblues');
  });
});
