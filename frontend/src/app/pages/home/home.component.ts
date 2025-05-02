import { Component } from '@angular/core';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { AgendarComponent } from '../../components/agendar/agendar.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ServiciosComponent, AgendarComponent, ContactoComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
