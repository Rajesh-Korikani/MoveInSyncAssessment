import { Component, signal } from '@angular/core';
import { FeedbackForm } from './components/feedback-form/feedback-form';
import { DriverDashboard } from './components/driver-dashboard/driver-dashboard';

@Component({
  imports: [FeedbackForm,  DriverDashboard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
