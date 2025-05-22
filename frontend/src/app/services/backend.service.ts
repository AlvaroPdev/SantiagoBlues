import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private API_URL = 'http://localhost:3000';
  private cache = new Map<string, CacheItem<any>>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  constructor(private http: HttpClient) {}

  private getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}${params ? JSON.stringify(params) : ''}`;
  }

  private getCache<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private clearCache(): void {
    this.cache.clear();
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cachedData = this.getCache<T>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<T>(`${this.API_URL}${endpoint}`, { params }).pipe(
      tap(data => this.setCache(cacheKey, data)),
      shareReplay(1),
      catchError(error => {
        console.error(`Error en GET ${endpoint}:`, error);
        throw error;
      })
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    this.clearCache(); // Limpiar caché al hacer POST
    return this.http.post<T>(`${this.API_URL}${endpoint}`, data).pipe(
      catchError(error => {
        console.error(`Error en POST ${endpoint}:`, error);
        throw error;
      })
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    this.clearCache(); // Limpiar caché al hacer PUT
    return this.http.put<T>(`${this.API_URL}${endpoint}`, data).pipe(
      catchError(error => {
        console.error(`Error en PUT ${endpoint}:`, error);
        throw error;
      })
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    this.clearCache(); // Limpiar caché al hacer DELETE
    return this.http.delete<T>(`${this.API_URL}${endpoint}`).pipe(
      catchError(error => {
        console.error(`Error en DELETE ${endpoint}:`, error);
        throw error;
      })
    );
  }
}
