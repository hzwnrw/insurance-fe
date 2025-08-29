import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InsuranceService, Insurance } from '../../shared/services/insurance.service';

interface Card {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cards: Card[] = [];
  loading = true;
  errorMessage = '';

  private ngZone = inject(NgZone);

  constructor(private router: Router, private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    console.log('HomepageComponent ngOnInit');
    this.fetchInsurances();
  }

  fetchInsurances(): void {
    this.loading = true;
    this.errorMessage = '';

    this.insuranceService.getInsurances().subscribe({
      next: (insurances: Insurance[]) => {
        this.ngZone.run(() => {
          console.log('Insurances fetched:', insurances);
          this.cards = insurances.map(i => ({
            title: i.name,
            description: `Category: ${i.category}, Price: $${i.price}`,
            link: `/plan/${i.id}`
          }));
          this.loading = false;
        });
      },
      error: err => {
        this.ngZone.run(() => {
          console.error('Error fetching insurances:', err);
          this.errorMessage = 'Failed to load insurances';
          this.loading = false;
        });
      }
    });
  }

  navigate(link: string): void {
    this.router.navigate([link]);
  }

  navigateToClaims(): void {
    this.router.navigate(['/claims']); // redirect to claim page
  }

}
