import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactForm: FormGroup;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      empresa: ['', Validators.required],
      web: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/contacto', this.contactForm.value).subscribe({
        next: () => {
          this.mensajeExito = 'Mensaje enviado con éxito.';
          this.mensajeError = '';
          this.resetForm();
        },
        error: () => {
          this.mensajeError = 'Error al enviar el mensaje.';
          this.mensajeExito = '';
        }
      });
    }
  }

  private resetForm(): void {
    this.contactForm.reset({
      nombre: '',
      empresa: '',
      web: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  }
}