import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { HomepageComponent } from './app/features/homepage/homepage.component';
import { routes } from './app/app.routes'; // Adjust the path to your routes file

bootstrapApplication(HomepageComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Use provideHttpClient to provide HttpClient
  ],
}).catch(err => console.error(err));
