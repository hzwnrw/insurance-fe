import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsuranceService, InsuranceDetail } from '../../shared/services/insurance.service';

@Component({
  selector: 'app-insurance-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-detail.component.html',
  styleUrls: ['./insurance-detail.component.css']
})
export class InsuranceDetailComponent implements OnInit {
  insuranceDetail: InsuranceDetail | null = null;

  // form fields
  age: number = 25;
  sumInsured: number = 50000;
  duration: number = 1;

  estimatedPremium: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.insuranceService.getInsuranceById(id).subscribe({
        next: (data) => {
          // Optional: map backend DTO if necessary
          this.insuranceDetail = {
            ...data,
            // map insurance_id to id if backend returns differently
            id: (data as any).insurance_id || data.id
          };
        },
        error: (err) => console.error('Error loading insurance:', err),
      });
    }
  }

  calculatePremium(): void {
    if (!this.insuranceDetail || this.insuranceDetail.premiumAmount === undefined) return;

    this.estimatedPremium =
      this.insuranceDetail.premiumAmount + // base premium from backend
      (this.age * 2) +
      (this.sumInsured / 1000) +
      (this.duration * 10);
  }
}
