import { Component, OnInit } from '@angular/core';
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
export class ChatbotComponent {

  mensajes: { texto: string, tipo: 'user' | 'bot' }[] = [];
  mensajeInput: string = '';
  isMinimized: boolean = false;

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

    this.http.post<any>('http://localhost:3000/chatbot', { mensaje }).subscribe({
      next: (data) => {
        this.agregarMensaje(data.respuesta, 'bot');
      },
      error: () => {
        this.agregarMensaje('Error al contactar al servidor.', 'bot');
      }
    });
  }

  agregarMensaje(texto: string, tipo: 'user' | 'bot'): void {
    this.mensajes.push({ texto, tipo });
    setTimeout(() => {
      const contenedor = document.getElementById('chat-body');
      if (contenedor) contenedor.scrollTop = contenedor.scrollHeight;
    }, 100);
  }
}
