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

  mensajeExito='';
  mensajeError='';

  constructor(private fb:FormBuilder, private http: HttpClient){
    this.contactForm= this.fb.group({
      nombre:['',Validators.required],
      empresa:['',Validators.required],
      web:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      telefono:[''],
      mensaje:['',Validators.required]
    });
  }

  

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/contacto', this.contactForm.value).subscribe({
        next: () => {
          this.mensajeExito = 'Mensaje enviado con éxito.';
          this.mensajeError = '';
          this.contactForm.reset();
        },
        error: () => {
          this.mensajeError = 'Error al enviar el mensaje.';
          this.mensajeExito = '';
        }
      });
    }
  }

}
// if(this.contactForm.valid){
    //   // manejar aqui la logica del envio del formulario, enviandolo a un servicio
    //   console.log(this.contactForm.value);
    //   this.contactForm.reset();
    // }