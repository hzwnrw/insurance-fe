import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Claim, ClaimService, PageResponse } from '../../shared/services/claim.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  claims: Claim[] = [];
  page = 0;
  size = 5;
  totalElements = 0;

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getClaims(this.page, this.size).subscribe((res: PageResponse<Claim>) => {
      this.claims = res.content;
      this.totalElements = res.totalElements;
    });
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.loadClaims();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadClaims();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadClaims();
  }

  updateStatus(id: number, status: string): void {
    this.claimService.updateStatus(id, status).subscribe(() => {
      this.loadClaims();
    });
  }
}
