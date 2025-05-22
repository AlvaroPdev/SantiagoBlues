import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatBody') chatBody!: ElementRef;
  
  mensajes: { texto: string, tipo: 'user' | 'bot' }[] = [];
  mensajeInput: string = '';
  isMinimized: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.agregarMensaje('Hola 👋, soy el asistente virtual de SantiagoBlues. ¿En qué te puedo ayudar?', 'bot');
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }

  enviarMensaje(): void {
    const mensaje = this.mensajeInput.trim();
    if (!mensaje) return;

    this.agregarMensaje(mensaje, 'user');
    this.mensajeInput = '';
    this.isLoading = true;

    this.http.post<any>('http://localhost:3000/chatbot', { mensaje }).subscribe({
      next: (data) => {
        this.agregarMensaje(data.respuesta, 'bot');
      },
      error: (error) => {
        console.error('Error en el chatbot:', error);
        this.agregarMensaje('Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.', 'bot');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private agregarMensaje(texto: string, tipo: 'user' | 'bot'): void {
    this.mensajes.push({ texto, tipo });
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatBody?.nativeElement) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
