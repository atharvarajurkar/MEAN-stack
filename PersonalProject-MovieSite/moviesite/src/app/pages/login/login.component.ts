import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true
  loginErrorMsg!: string

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email], [this.authService.checkEmailValidator(true)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  getEmailErrorMessage() {
    this.loginErrorMsg = ""
    if (this.email?.hasError('required')) {
      return 'You must enter an email'
    } else if (this.email?.hasError('email')) {
      return 'Not a valid email'
    } else if (this.email?.hasError('emailDoesNotExist')) {
      return 'Email not registered'
    } else {
      return ''
    }
  }

  getPasswordErrorMessage() {
    this.loginErrorMsg = ""
    if (this.password?.hasError('required')) {
      return 'You must enter a password'
    } else if (this.password?.hasError('minlength')) {
      return 'Please enter atleast 6 chars'
    } else {
      return ''
    }
  }

  onSignIn() {
    if (this.loginForm.valid) {
      const loginDetails = { role: "USER", username: this.loginForm.value['email'].split("@")[0], ...this.loginForm.value }
      this.authService.login(loginDetails).subscribe({
        next: (next) => { },
        error: (error) => {
          this.loginErrorMsg = error.message
        }
      })
      this.authService.currentUserObs$.subscribe((user: User | null) => {
        if (user) {
          this.router.navigate(['/movieList/movies']);
        }
      })
    }
  }

  onSignUpClick() {
    this.router.navigate(['../register/step1']);
  }

  // onSubmit(){
  //   if (this.loginForm.valid){
  //     this.router.navigate(['/movieList/movies']);
  //   }
  // }
}
