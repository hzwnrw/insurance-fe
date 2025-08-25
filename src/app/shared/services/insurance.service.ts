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

export interface InsuranceDetail {
  id: number; 
  coverageDetails?: string;
  coverageLimit: number;
  endDate: string;
  insuranceId: number;
  policyStatus: string;
  premiumAmount: number;
  startDate: string;
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

  getInsuranceById(id: number | string): Observable<InsuranceDetail> {
    return this.http.get<InsuranceDetail>(`${this.apiUrl}/detail/${id}`)
        .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
