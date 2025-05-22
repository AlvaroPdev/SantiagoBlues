import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BackendService', () => {
  let service: BackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService]
    });
    service = TestBed.inject(BackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to agendar endpoint', () => {
    const testData = {
      nombre: 'Juan',
      email: 'juan@test.com',
      fecha: '2024-05-20',
      hora: '10:00',
      servicio: 'Desarrollo Web'
    };

    service.agendarCita(testData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/agendar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
    req.flush({ success: true });
  });

  it('should handle error in agendarCita', () => {
    const testData = {
      nombre: 'Juan',
      email: 'juan@test.com',
      fecha: '2024-05-20',
      hora: '10:00',
      servicio: 'Desarrollo Web'
    };

    service.agendarCita(testData).subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/agendar');
    expect(req.request.method).toBe('POST');
    req.flush('Error del servidor', { 
      status: 500, 
      statusText: 'Internal Server Error' 
    });
  });

  it('should handle network error in agendarCita', () => {
    const testData = {
      nombre: 'Juan',
      email: 'juan@test.com',
      fecha: '2024-05-20',
      hora: '10:00',
      servicio: 'Desarrollo Web'
    };

    service.agendarCita(testData).subscribe({
      next: () => fail('should have failed with network error'),
      error: (error) => {
        expect(error.status).toBe(0);
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/agendar');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
  });

  it('should validate required fields in agendarCita', () => {
    const testData = {
      nombre: '',
      email: '',
      fecha: '',
      hora: '',
      servicio: ''
    };

    service.agendarCita(testData).subscribe({
      next: () => fail('should have failed with validation error'),
      error: (error) => {
        expect(error.status).toBe(400);
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/agendar');
    expect(req.request.method).toBe('POST');
    req.flush('Campos requeridos', { 
      status: 400, 
      statusText: 'Bad Request' 
    });
  });
});
