import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  registerForm!: FormGroup
  hidePassword: boolean = true

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email], [this.authService.checkEmailValidator(false)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter an email'
    } else if (this.email?.hasError('email')) {
      return 'Not a valid email'
    } else if (this.email?.hasError('emailExists')) {
      return 'This email is already registered'
    } else {
      return ''
    }
  }

  getPasswordErrorMessage() {

    if (this.password?.hasError('required')) {
      return 'You must enter a password'
    } else if (this.password?.hasError('minlength')) {
      return 'Please enter atleast 6 chars'
    } else {
      return ''
    }
  }

  onNext() {
    console.log("onNext ", this.registerForm.value, this.registerForm.valid);
    if (this.registerForm.valid) {
      const signUpDetails = {username: this.registerForm.value['email'].split("@")[0], ...this.registerForm.value }
      this.authService.signup(signUpDetails).subscribe({
        next: (next) => { },
        error: (error) => {
          console.log(error);
        }
      })
      this.authService.currentUserObs$.subscribe((user: User | null) => {
        if (user) {
          this.router.navigate(['../step3'], { relativeTo: this.activatedRoute });
        }
      })
    }
  }
}
