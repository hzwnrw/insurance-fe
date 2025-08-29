import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Claim {
  id: number;
  name: string;
  policyID: string;
  claimReason: string;
  claimAmount: number;
  status: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `${environment.apiUrl}/api/claim`;

  constructor(private http: HttpClient) {}

  // Get pageable claims
  getClaims(page: number, size: number): Observable<PageResponse<Claim>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<PageResponse<Claim>>(`${this.apiUrl}/all`, { params })
    .pipe(catchError(this.handleError));
  }

  // Create a new claim
  addClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/add`, claim)
      .pipe(catchError(this.handleError));
  }

  // Update status (Approve / Reject)
  updateStatus(id: number, status: string): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}/status?status=${status}`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
