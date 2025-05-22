import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { AgendarComponent } from '../../components/agendar/agendar.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { LogosComponent } from '../../components/logos/logos.component';
import { PerfilComponent } from '../../components/perfil/perfil.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NavbarComponent,
        ServiciosComponent,
        AgendarComponent,
        ContactoComponent,
        FooterComponent,
        ChatbotComponent,
        LogosComponent,
        PerfilComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all required components', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-agendar')).toBeTruthy();
    expect(compiled.querySelector('app-perfil')).toBeTruthy();
    expect(compiled.querySelector('app-servicios')).toBeTruthy();
    expect(compiled.querySelector('app-contacto')).toBeTruthy();
    expect(compiled.querySelector('app-logos')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
    expect(compiled.querySelector('app-chatbot')).toBeTruthy();
  });

  it('should have correct component structure', () => {
    const compiled = fixture.nativeElement;
    const components = Array.from(compiled.children) as HTMLElement[];
    
    // Verificar el orden de los componentes
    expect(components[0].tagName.toLowerCase()).toBe('app-navbar');
    expect(components[1].tagName.toLowerCase()).toBe('app-agendar');
    expect(components[2].tagName.toLowerCase()).toBe('app-perfil');
    expect(components[3].tagName.toLowerCase()).toBe('app-servicios');
    expect(components[4].tagName.toLowerCase()).toBe('app-contacto');
    expect(components[5].tagName.toLowerCase()).toBe('app-logos');
    expect(components[6].tagName.toLowerCase()).toBe('app-footer');
    expect(components[7].tagName.toLowerCase()).toBe('app-chatbot');
  });

  it('should have navbar at the top', () => {
    const compiled = fixture.nativeElement;
    const firstComponent = compiled.firstElementChild;
    expect(firstComponent.tagName.toLowerCase()).toBe('app-navbar');
  });

  it('should have footer before chatbot', () => {
    const compiled = fixture.nativeElement;
    const components = Array.from(compiled.children) as HTMLElement[];
    const footerIndex = components.findIndex(el => el.tagName.toLowerCase() === 'app-footer');
    const chatbotIndex = components.findIndex(el => el.tagName.toLowerCase() === 'app-chatbot');
    
    expect(footerIndex).toBeLessThan(chatbotIndex);
  });

  it('should have main content components in correct order', () => {
    const compiled = fixture.nativeElement;
    const components = Array.from(compiled.children) as HTMLElement[];
    
    // Verificar que los componentes principales están en el orden correcto
    const mainComponents = components.slice(1, -2); // Excluir navbar, footer y chatbot
    const expectedOrder = ['app-agendar', 'app-perfil', 'app-servicios', 'app-contacto', 'app-logos'];
    
    mainComponents.forEach((component, index) => {
      expect(component.tagName.toLowerCase()).toBe(expectedOrder[index]);
    });
  });

  it('should have chatbot as the last component', () => {
    const compiled = fixture.nativeElement;
    const lastComponent = compiled.lastElementChild;
    expect(lastComponent.tagName.toLowerCase()).toBe('app-chatbot');
  });
});
