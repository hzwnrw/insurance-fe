import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService, InsuranceDetail } from '../../shared/services/insurance.service';

@Component({
  selector: 'app-insurance-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insurance-detail.component.html',
  styleUrls: ['./insurance-detail.component.css']
})
export class InsuranceDetailComponent implements OnInit {
  insuranceForm!: FormGroup;
  totalPremium: number = 0;
  insuranceId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    // Build reactive form
    this.insuranceForm = this.fb.group({
      id: [''],
      coverageDetails: [''],
      coverageLimit: [0, [Validators.required, Validators.min(1)]], // Sum Insured
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      policyStatus: [''],
      premiumAmount: [0, [Validators.required, Validators.min(0)]], // Base Premium
      months: [1, [Validators.required, Validators.min(1)]],        // Duration
      age: [30, [Validators.required, Validators.min(0)]],          // Age
    });

    // Get insurance ID from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.insuranceId = +id;
        this.loadInsurance(this.insuranceId);
      }
    });

    // Auto-calc total premium using formula
    this.insuranceForm.valueChanges.subscribe(val => {
      const base = val.premiumAmount || 0;
      const age = val.age || 0;
      const sumInsured = val.coverageLimit || 0;
      const duration = val.months || 1;

      this.totalPremium = base + (age * 2) + (sumInsured / 1000) + (duration * 10);
    });
  }

  private loadInsurance(id: number) {
    this.insuranceService.getInsuranceById(id).subscribe({
      next: (detail: InsuranceDetail) => {
        // Patch API data into the form
        this.insuranceForm.patchValue({
          ...detail,
          months: 1,
          age: 30
        });

        // Initial total calculation
        const base = detail.premiumAmount || 0;
        const age = 30;
        const sumInsured = detail.coverageLimit || 0;
        const duration = 1;
        this.totalPremium = base + (age * 2) + (sumInsured / 1000) + (duration * 10);
      },
      error: (err) => {
        console.error('Failed to load insurance detail', err);
      }
    });
  }

  // onSubmit(): void {
  //   if (this.insuranceForm.valid) {
  //     console.log('Submitted form:', this.insuranceForm.value);
  //     console.log('Total premium:', this.totalPremium);
  //   } else {
  //     this.insuranceForm.markAllAsTouched();
  //   }
  // }
}
