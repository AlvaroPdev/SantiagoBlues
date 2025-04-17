import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'agendar', component: AgendarComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' },
];