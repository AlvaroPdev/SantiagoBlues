import { Component } from '@angular/core';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { AgendarComponent } from '../../components/agendar/agendar.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ChatbotComponent } from "../../components/chatbot/chatbot.component";
import { LogosComponent } from "../../components/logos/logos.component";
import { PerfilComponent } from "../../components/perfil/perfil.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ServiciosComponent, AgendarComponent, ContactoComponent, FooterComponent, ChatbotComponent, LogosComponent, PerfilComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
