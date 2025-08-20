import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InsuranceService } from '../../shared/services/insurance.service';
import { Observable } from 'rxjs';

interface Card {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule], // Remove HttpClientModule here
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cards: Card[] = [];

  constructor(private router: Router, private insuranceService: InsuranceService) {
    console.log('HomepageComponent constructor');
  }

  ngOnInit() {
    console.log('HomepageComponent ngOnInit');
    this.fetchInsurances();
  }

  fetchInsurances() {
    console.log('Fetching insurances');
    this.insuranceService.getInsurances().subscribe(
      insurances => {
        console.log('Insurances fetched:', insurances);
        this.cards = insurances.map(insurance => ({
          title: insurance.name,
          description: `Category: ${insurance.category}, Price: $${insurance.price}`,
          link: `/insurance/${insurance.id}`
        }));
      },
      error => {
        console.error('Error fetching insurances:', error);
      }
    );
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
