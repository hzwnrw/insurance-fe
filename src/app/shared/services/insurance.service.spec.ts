import { TestBed } from '@angular/core/testing';
import { InsuranceService } from './insurance.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('InsuranceService', () => {
  let service: InsuranceService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        InsuranceService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    service = TestBed.inject(InsuranceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected insurances (HttpClient called once)', () => {
    const expectedInsurances = [
      { id: 1, name: 'Comprehensive Health Plan', category: 'Health', price: 1200.0 },
      { id: 2, name: 'Standard Auto Coverage', category: 'Auto', price: 800.0 },
    ];

    service.getInsurances().subscribe(insurances => {
      expect(insurances).toEqual(expectedInsurances);
    });

    const req = httpTestingController.expectOne('https://your-api-url.com/insurances');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedInsurances);
  });

  // it('should return expected insurance by ID (HttpClient called once)', () => {
  //   const expectedInsurance = { id: 1, name: 'Comprehensive Health Plan', category: 'Health', price: 1200.0 };

  //   service.getInsuranceById(1).subscribe(insurance => {
  //     expect(insurance).toEqual(expectedInsurance);
  //   });

  //   const req = httpTestingController.expectOne('https://your-api-url.com/insurances/1');
  //   expect(req.request.method).toEqual('GET');

  //   req.flush(expectedInsurance);
  // });

  // Add more tests for other methods and scenarios as needed
});
