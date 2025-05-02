import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export class AgendarComponent {
  showModal = false;
  meetingData = {
    name: '',
    email: ''
  };

  // Calendario
  currentDate = new Date();
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  get currentMonth(): string {
    return this.currentDate.toLocaleString('es-ES', { month: 'long' });
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  get calendarDays(): Date[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // Agregar días del mes anterior
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Agregar días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Agregar días del siguiente mes
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  }

  isSelected(day: Date): boolean {
    if (!this.selectedDate) return false;
    return day.toDateString() === this.selectedDate.toDateString();
  }

  isToday(day: Date): boolean {
    return day.toDateString() === new Date().toDateString();
  }

  isCurrentMonth(day: Date): boolean {
    return day.getMonth() === this.currentDate.getMonth();
  }

  selectDate(day: Date): void {
    if (this.isCurrentMonth(day)) {
      this.selectedDate = day;
    }
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  isFormValid(): boolean {
    return this.meetingData.name !== '' && 
          this.meetingData.email !== '' && 
          this.selectedDate !== null && 
          this.selectedTime !== null;
  }

  openModal(): void {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDate = null;
    this.selectedTime = null;
    document.body.style.overflow = 'auto';
  }

  constructor(private backendService: BackendService) {}

submitForm(): void {
  if (this.isFormValid() && this.selectedDate && this.selectedTime) {
    const [hour, minute] = this.selectedTime.split(':').map(Number);

    const startDate = new Date(this.selectedDate);
    startDate.setHours(hour, minute, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const cita = {
      nombre: this.meetingData.name,
      correo: this.meetingData.email,
      fechaInicio: startDate.toISOString(),
      fechaFin: endDate.toISOString()
    };

    this.backendService.agendarCita(cita).subscribe({
      next: (res: any) => {
        alert('Cita agendada. Abriendo enlace Meet...');
        window.open(res.meetLink, '_blank');
        this.closeModal();
      },
      error: (err) => {
        alert(err.error.mensaje || 'Error al agendar cita.');
      }
    });
  }
}
}  