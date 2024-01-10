import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrankfurterService {
  private apiBaseUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

  // Gauk visų valiutų sąrašą iš Frankfurter API
  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/currencies`).pipe(
      catchError(this.handleHttpError)
    );
  }

  // Gauti valiutos kursą iš vienos valiutos į kitą iš Frankfurter API
  getExchangeRate(from: string, to: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/latest?from=${from}&to=${to}`).pipe(
      catchError(this.handleHttpError)
    );
  }

  // Apdoroti HTTP užklausų klaidas ir grąžinti klaidos pranešimą
  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Įvyko klaida vykdant HTTP užklausą.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Įvyko klaida: ${error.error.message}`;
    } else {
      errorMessage = `Serverio klaida: ${error.status}, ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
