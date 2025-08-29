import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../shared/services/claim.service';

@Component({
  selector: 'app-claim-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './claim-new.component.html',
  styleUrls: ['./claim-new.component.css']
})
export class ClaimNewComponent {
  claimForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private router: Router
  ) {
    this.claimForm = this.fb.group({
      name: ['', Validators.required],
      policyID: ['', Validators.required],
      claimReason: ['', Validators.required],
      claimAmount: [0, [Validators.required, Validators.min(1)]],
      status: ['PENDING']
    });
  }

  // Submit with alert and redirect
  onSubmit(): void {
    if (this.claimForm.valid) {
      this.claimService.addClaim(this.claimForm.value).subscribe(() => {
        alert('Claim submitted successfully!');
        // setTimeout(() => this.router.navigate(['/claims']));
      });
    }
  }

  // Cancel button redirect
  cancel(): void {
    this.router.navigate(['/claims']);
  }
}
