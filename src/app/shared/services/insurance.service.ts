import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Insurance {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'http://localhost:1204/api/insurance';

  constructor(private http: HttpClient) {}

  getInsurances(): Observable<Insurance[]> {
    return this.http.post<Insurance[]>(`${this.apiUrl}/all`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
