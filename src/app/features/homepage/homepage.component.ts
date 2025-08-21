import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InsuranceService } from '../../shared/services/insurance.service';
import { NgZone } from '@angular/core';

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

  private ngZone = inject(NgZone); // ✅ inject NgZone

  constructor(private router: Router, private insuranceService: InsuranceService) {
    console.log('HomepageComponent constructor');
  }

  ngOnInit(): void {
    console.log('HomepageComponent ngOnInit');
    this.fetchInsurances();
  }

  fetchInsurances(): void {
    console.log('Fetching insurances...');
    this.loading = true;
    this.errorMessage = '';

    this.insuranceService.getInsurances().subscribe({
      next: insurances => {
        // Run inside Angular zone to ensure DOM updates
        this.ngZone.run(() => {
          console.log('Insurances fetched:', insurances);
          this.cards = insurances.map(insurance => ({
            title: insurance.name,
            description: `Category: ${insurance.category}, Price: $${insurance.price}`,
            link: `/insurance/${insurance.id}`
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
}
