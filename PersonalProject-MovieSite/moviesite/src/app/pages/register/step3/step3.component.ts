import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  registerFormData!: any
  selectedPlan: "Basic" | "Standard" | "Premium" = "Basic"
  role: string = "USER"
  constructor(private router: Router, private authService: AuthService) {
    this.registerFormData = this.router.getCurrentNavigation()?.extras.state?.['registerFormData'];
  }

  isSelectedPlan(plan: string): boolean {
    if (plan === this.selectedPlan) {
      return true
    }
    return false
  }

  onNext() {
    switch (this.selectedPlan) {
      case 'Basic':
        this.role = "USER"
        break
      case 'Standard':
        this.role = "ADMIN"
        break
      case 'Premium':
        this.role = "SUPERUSER"
        break
    }
    const signUpDetails = { role: this.role, username: this.registerFormData['email'].split("@")[0], ...this.registerFormData }
    this.authService.signup(signUpDetails).subscribe({
      next: (next) => { },
      error: (error) => {
        console.log(error);
      }
    })
    this.authService.currentUserObs$.subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(['/movieList']);
      }
    })
  }
}
