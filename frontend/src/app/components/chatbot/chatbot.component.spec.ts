import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatbotComponent,
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
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

  it('should initialize with welcome message', () => {
    expect(component.mensajes.length).toBe(1);
    expect(component.mensajes[0].tipo).toBe('bot');
    expect(component.mensajes[0].texto).toContain('Hola 👋');
  });

  it('should have initial state', () => {
    expect(component.mensajeInput).toBe('');
    expect(component.isMinimized).toBeFalse();
  });

  it('should toggle minimize state', () => {
    expect(component.isMinimized).toBeFalse();
    component.toggleMinimize();
    expect(component.isMinimized).toBeTrue();
    component.toggleMinimize();
    expect(component.isMinimized).toBeFalse();
  });

  it('should not send empty messages', () => {
    const initialMessageCount = component.mensajes.length;
    component.mensajeInput = '   ';
    component.enviarMensaje();
    expect(component.mensajes.length).toBe(initialMessageCount);
  });

  it('should send message and receive response', fakeAsync(() => {
    const testMessage = 'Hola';
    const testResponse = { respuesta: '¡Hola! ¿En qué puedo ayudarte?' };

    component.mensajeInput = testMessage;
    component.enviarMensaje();

    const req = httpMock.expectOne('http://localhost:3000/chatbot');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ mensaje: testMessage });
    req.flush(testResponse);

    tick(100); // Esperar el setTimeout
    fixture.detectChanges();

    expect(component.mensajes.length).toBe(3); // Mensaje inicial + mensaje usuario + respuesta
    expect(component.mensajes[1].texto).toBe(testMessage);
    expect(component.mensajes[1].tipo).toBe('user');
    expect(component.mensajes[2].texto).toBe(testResponse.respuesta);
    expect(component.mensajes[2].tipo).toBe('bot');
  }));

  it('should handle server error', fakeAsync(() => {
    const testMessage = 'Hola';
    component.mensajeInput = testMessage;
    component.enviarMensaje();

    const req = httpMock.expectOne('http://localhost:3000/chatbot');
    req.error(new ErrorEvent('Network error'));

    tick(100);
    fixture.detectChanges();

    expect(component.mensajes.length).toBe(3);
    expect(component.mensajes[2].texto).toBe('Error al contactar al servidor.');
    expect(component.mensajes[2].tipo).toBe('bot');
  }));

  it('should clear input after sending message', fakeAsync(() => {
    const testMessage = 'Test message';
    component.mensajeInput = testMessage;
    component.enviarMensaje();

    const req = httpMock.expectOne('http://localhost:3000/chatbot');
    req.flush({ respuesta: 'Respuesta de prueba' });

    tick(100);
    fixture.detectChanges();

    expect(component.mensajeInput).toBe('');
  }));

  it('should render chat interface correctly', () => {
    const compiled = fixture.nativeElement;
    
    // Verificar elementos principales
    expect(compiled.querySelector('.chatbot-container')).toBeTruthy();
    expect(compiled.querySelector('.chat-header')).toBeTruthy();
    expect(compiled.querySelector('.chat-body')).toBeTruthy();
    expect(compiled.querySelector('.chat-input-container')).toBeTruthy();
    
    // Verificar elementos de entrada
    expect(compiled.querySelector('input')).toBeTruthy();
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should hide chat body and input when minimized', () => {
    const compiled = fixture.nativeElement;
    
    // Verificar que los elementos están visibles inicialmente
    expect(compiled.querySelector('.chat-body')).toBeTruthy();
    expect(compiled.querySelector('.chat-input-container')).toBeTruthy();
    
    // Minimizar el chat
    component.toggleMinimize();
    fixture.detectChanges();
    
    // Verificar que los elementos están ocultos
    expect(compiled.querySelector('.chat-body')).toBeFalsy();
    expect(compiled.querySelector('.chat-input-container')).toBeFalsy();
  });
});
